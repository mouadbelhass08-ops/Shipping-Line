const { sql, poolPromise } = require('../config/db');

exports.passengerDashboard = async (req, res) => {
  try {
    // Ensure user is logged in
    if (!req.session.user || !req.session.user.email) {
      return res.status(401).json({ error: 'Unauthorized: no user session' });
    }

    const email = req.session.user.email;
    const pool = await poolPromise;

    // Find passenger_id from email
    const passengerResult = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT id FROM Passengers WHERE email = @email');

    if (passengerResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Passenger not found' });
    }

    const passengerId = passengerResult.recordset[0].id;

    // Fetch bookings for this passenger
    const result = await pool.request()
      .input('passenger_id', sql.Int, passengerId)
      .query(`
        SELECT departure, arrival, seats, price, booking_date
        FROM Bookings
        WHERE passenger_id = @passenger_id
        ORDER BY booking_date DESC
      `);

    // Return JSON for frontend fetch
    res.json(result.recordset);
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};