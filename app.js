const express = require('express');
const session = require('express-session');
const path = require('path');
const passengerRoutes = require('./routes/passengerRoutes');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/authRoutes');
const dashRoutes = require('./routes/dashRoutes');
const viewRoutes = require('./routes/viewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authController = require('./controllers/authController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Session setup
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  }
}));

// Activity-based timeout refresh
app.use((req, res, next) => {
  if (req.session) {
    req.session._garbage = Date();
    req.session.touch();
  }
  next();
});

// Registration routes
app.post('/register/passenger', authController.registerPassenger);
app.post('/register/corp', authController.registerCorp);

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Could not log out');
    }
    res.redirect('/login');
  });
});

// API & feature routes
app.use('/api/passengers', passengerRoutes);
app.use('/', adminRoutes);
app.use('/', authRoutes);
app.use('/', dashRoutes);
app.use('/', bookingRoutes);
app.use('/', viewRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;