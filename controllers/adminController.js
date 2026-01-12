const { sql, poolPromise } = require('../config/db');

// --- Quick Stats ---
exports.getStats = async (req, res) => {
  try {
    const pool = await poolPromise;

    const usersResult = await pool.request().query('SELECT COUNT(*) AS totalUsers FROM Users');
    const passengersResult = await pool.request().query('SELECT COUNT(*) AS passengers FROM Passengers');
    const corpResult = await pool.request().query('SELECT COUNT(*) AS corporations FROM Corporates');

    res.json({
      totalUsers: usersResult.recordset[0].totalUsers,
      passengers: passengersResult.recordset[0].passengers,
      corporations: corpResult.recordset[0].corporations
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// --- Users list ---
exports.getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT u.email, r.role_name AS role
      FROM Users u
      LEFT JOIN Roles r ON u.role_id = r.id
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// --- Passengers list ---
exports.getPassengers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT id, name, email FROM Passengers');
    res.json(result.recordset);
  } catch (err) {
    console.error('Passengers error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getActiveBookings = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT b.id, b.departure, b.arrival, b.seats, b.booking_date, p.name AS passenger
      FROM Bookings b
      JOIN Passengers p ON b.passenger_id = p.id
      ORDER BY b.booking_date DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Bookings error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};