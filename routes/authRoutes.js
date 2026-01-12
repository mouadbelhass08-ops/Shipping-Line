const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../views/register.html'))
);
router.post('/register', authController.register);

router.get('/login', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../views/login.html'))
);
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error logging out');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;