const bcrypt = require('bcrypt');
const { sql, poolPromise } = require('../config/db');

// Registration Step 1: create user
exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const pool = await poolPromise;

    // Look up role id
    const roleResult = await pool.request()
      .input('role_name', sql.VarChar, role)
      .query('SELECT id FROM Roles WHERE role_name = @role_name');

    if (roleResult.recordset.length === 0) {
      return res.status(400).send('Invalid role');
    }

    const roleId = roleResult.recordset[0].id;

    // Insert into Users
    await pool.request()
      .input('email', sql.VarChar, email)
      .input('password_hash', sql.VarChar, hashedPassword)
      .input('role_id', sql.Int, roleId)
      .query('INSERT INTO Users (email, password_hash, role_id) VALUES (@email, @password_hash, @role_id)');

    // Save step 1 info in session
    req.session.registrationStep1 = true;
    req.session.user = { email, role_id: roleId }; // ✅ ensures email available in step 2

    // Redirect to second step depending on role
    if (roleId === 2) {
      res.redirect('/register/passenger');
    } else if (roleId === 3) {
      res.redirect('/register/corp');
    } else if (roleId === 1) {
      res.redirect('/admin-dashboard?welcome=1');
    } else {
      res.status(400).send('Unknown role');
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server error');
  }
};

// Registration Step 2: passenger profile
exports.registerPassenger = async (req, res) => {
  if (!req.session.registrationStep1) return res.redirect('/register');

  const { name, passport, phone_zone, phone } = req.body;
  const email = req.session.user?.email;
  const fullPhone = `${phone_zone}${phone}`;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('phone', sql.VarChar, fullPhone)
      .input('passport', sql.VarChar, passport)
      .query('INSERT INTO Passengers (name, email, phone, passport) VALUES (@name, @email, @phone, @passport)');

    delete req.session.registrationStep1;
    req.session.user = { email, role_id: 2 }; // auto-login as passenger

    res.redirect('/passenger-dashboard');
  } catch (err) {
    console.error('Passenger registration error:', err);
    res.status(500).send('Server error');
  }
};

// Registration Step 2: corporate profile
exports.registerCorp = async (req, res) => {
  if (!req.session.registrationStep1) return res.redirect('/register');

  const { companyName } = req.body;
  const email = req.session.user?.email;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('email', sql.VarChar, email)
      .input('companyName', sql.VarChar, companyName)
      .query('INSERT INTO Corporates (email, company_name) VALUES (@email, @companyName)');

    delete req.session.registrationStep1;
    req.session.user = { email, role_id: 3 }; // auto-login as corp

    res.redirect('/corp-dashboard');
  } catch (err) {
    console.error('Corp registration error:', err);
    res.status(500).send('Server error');
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT email, password_hash, role_id FROM Users WHERE email = @email');

    const user = result.recordset[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.redirect('/login?error=Invalid email or password');
    }

    req.session.user = { email: user.email, role_id: user.role_id };

    // Redirect based on role_id
    if (user.role_id === 1) {
      res.redirect('/admin-dashboard?welcome=1');
    } else if (user.role_id === 2) {
      res.redirect('/passenger-dashboard');
    } else if (user.role_id === 3) {
      res.redirect('/corp-dashboard');
    } else {
      res.status(403).send('Unknown role');
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
};