const { sql, poolPromise } = require('../config/db');

exports.findAll = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Passengers');
  return result.recordset;
};

exports.findById = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Passengers WHERE id = @id');
  return result.recordset[0];
};

exports.create = async (data) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('name', sql.NVarChar, data.name)
    .input('email', sql.NVarChar, data.email)
    .input('phone', sql.NVarChar, data.phone)
    .input('passport', sql.NVarChar, data.passport)
    .query(`
      INSERT INTO Passengers (name, email, phone, passport)
      OUTPUT INSERTED.*
      VALUES (@name, @email, @phone, @passport)
    `);
  return result.recordset[0];
};

exports.update = async (id, data) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.NVarChar, data.name)
    .input('email', sql.NVarChar, data.email)
    .input('phone', sql.NVarChar, data.phone)
    .input('passport', sql.NVarChar, data.passport)
    .query(`
      UPDATE Passengers
      SET name = @name, email = @email, phone = @phone, passport = @passport
      WHERE id = @id;
      SELECT * FROM Passengers WHERE id = @id
    `);
  return result.recordset[0];
};

exports.remove = async (id) => {
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Passengers WHERE id = @id');
  return { message: 'Passenger deleted successfully' };
};