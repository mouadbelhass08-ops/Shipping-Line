const express = require('express');
const path = require('path');
const { requireStep1 } = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../views/home.html')));
router.get('/home', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../views/home.html')));
router.get('/register', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../views/register.html')));
router.get('/register/passenger', requireStep1, (req, res) => 
    res.sendFile(path.resolve(__dirname, '../views/register/passenger.html')));
router.get('/register/corp', requireStep1, (req, res) => 
    res.sendFile(path.resolve(__dirname, '../views/register/corp.html')));
router.get('/login', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../views/login.html')));
router.get('/booking', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../views/passenger/booking.html')));
router.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '../views/404.html'));
});

module.exports = router;