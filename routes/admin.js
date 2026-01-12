const express = require('express');
const path = require('path');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// --- Admin dashboard page ---
router.get('/admin-dashboard', requireAuth, requireRole(1), (req, res) => {
  const user = req.session?.user;
  if (user && user.role_id === 1) {
    res.sendFile(path.join(__dirname, '../views/admin/dashboard.html'));
  } else {
    res.status(403).send('Forbidden');
  }
});

// --- API endpoints for dashboard data ---
router.get('/api/admin/stats', requireAuth, requireRole(1), adminController.getStats);
router.get('/api/admin/users', requireAuth, requireRole(1), adminController.getUsers);
router.get('/api/admin/passengers', requireAuth, requireRole(1), adminController.getPassengers);
router.get('/api/admin/bookings', requireAuth, requireRole(1), adminController.getActiveBookings);

module.exports = router;