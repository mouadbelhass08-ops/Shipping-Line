const { sql, poolPromise } = require('../config/db');

exports.confirmBooking = async (req, res) => {
  const { departure, arrival, seats } = req.body;
  const email = req.session.user?.email;

  // Example price matrix (simplify or move to DB later)
  const prices = {
    "Casablanca-Tangier": 300,
    "Casablanca-Marseille": 1200,
    "Casablanca-New York": 5000,
    "Tangier-Casablanca": 300,
    "Tangier-Marseille": 1000,
    "Tangier-New York": 4800,
    "Marseille-Casablanca": 1200,
    "Marseille-Tangier": 1000,
    "Marseille-New York": 4500,
    "New York-Casablanca": 5000,
    "New York-Tangier": 4800,
    "New York-Marseille": 4500
  };

  const key = `${departure}-${arrival}`;
  const basePrice = prices[key] || 0;
  const totalPrice = basePrice * seats;

  try {
    const pool = await poolPromise;

    // 1. Find passenger_id from email
    const passengerResult = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT id FROM Passengers WHERE email = @email');

    if (passengerResult.recordset.length === 0) {
      return res.status(400).send('Passenger not found');
    }

    const passengerId = passengerResult.recordset[0].id;

    // 2. Insert booking with passenger_id
    await pool.request()
      .input('passenger_id', sql.Int, passengerId)
      .input('departure', sql.VarChar, departure)
      .input('arrival', sql.VarChar, arrival)
      .input('seats', sql.Int, seats)
      .input('price', sql.Int, totalPrice)
      .query(`
        INSERT INTO Bookings (passenger_id, departure, arrival, seats, price)
        VALUES (@passenger_id, @departure, @arrival, @seats, @price)
      `);

    // Redirect back to dashboard
    res.redirect('/passenger-dashboard');
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).send('Server error');
  }
};