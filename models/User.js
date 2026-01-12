const sql = require('mssql');

// Insert new user
async function createUser(email, hashedPassword) {
  const result = await sql.query`
    INSERT INTO Users (email, password_hash)
    VALUES (${email}, ${hashedPassword});
  `;
  return result;
}

// Find user by email
async function findUserByEmail(email) {
  const result = await sql.query`
    SELECT * FROM Users WHERE email = ${email};
  `;
  return result.recordset[0];
}

module.exports = { createUser, findUserByEmail };