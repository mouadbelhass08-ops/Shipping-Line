const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const dashController = require('../controllers/dashController');

// Booking form submission
router.post('/booking/confirm', bookingController.confirmBooking);

// Passenger dashboard
router.get('/passenger-dashboard', dashController.passengerDashboard);

module.exports = router;