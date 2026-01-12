const express = require('express');
const path = require('path');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const dashController = require('../controllers/dashController');

// --- Page routes (serve static HTML) ---
router.get('/admin-dashboard', requireAuth, requireRole(1), (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/admin/dashboard.html'));
});

router.get('/passenger-dashboard', requireAuth, requireRole(2), (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/passenger/dashboard.html'));
});

router.get('/corp-dashboard', requireAuth, requireRole(3), (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/corp/dashboard.html'));
});

// --- API route (return JSON for bookings) ---
router.get('/api/passenger-dashboard', requireAuth, requireRole(2), dashController.passengerDashboard);

module.exports = router;