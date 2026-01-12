/* // config/session.js
const session = require('express-session');
const crypto = require('crypto');

// Initial secret: use .env if provided, otherwise generate dynamically
let sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(64).toString('hex');

// Rotate secret every 24 hours (you can adjust the interval)
setInterval(() => {
  sessionSecret = crypto.randomBytes(64).toString('hex');
  console.log('Session secret rotated');
}, 24 * 60 * 60 * 1000); // 24h in ms

// Export session middleware
module.exports = session({
  secret: () => sessionSecret, // express-session accepts a function
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set true if using HTTPS
    httpOnly: true, // prevents client-side JS from reading the cookie
    maxAge: 1000 * 60 * 60 // 1 hour session lifetime
  }
}); */