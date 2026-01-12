const express = require('express');
const router = express.Router();

// Step 1: Capture credentials
router.post('/', (req, res) => {
  const { email, password, role } = req.body;

  // Basic validation
  if (!email || !password || !role) {
    return res.status(400).send("Missing required fields");
  }

  // Save draft in session
  req.session.userDraft = { email, password, role };

  // Redirect based on role
  if (role === 'passenger') {
    return res.redirect('/register/passenger');
  } else if (role === 'corporation') {
    return res.redirect('/register/corporation');
  } else {
    return res.redirect('/register'); // fallback
  }
});

// Step 2: Passenger form
router.get('/passenger', (req, res) => {
  if (!req.session.userDraft) {
    return res.redirect('/register'); // force back to Step 1
  }
  res.render('register/passenger');
});

router.post('/passenger', (req, res) => {
  if (!req.session.userDraft) {
    return res.redirect('/register');
  }

  const draft = req.session.userDraft;
  const passengerData = req.body;

  // TODO: Save draft.email, draft.password, draft.role + passengerData in DB

  req.session.userDraft = null; // clear draft
  res.redirect('/login');
});

// Step 2: Corporation form
router.get('/corporation', (req, res) => {
  if (!req.session.userDraft) {
    return res.redirect('/register');
  }
  res.render('register/corporation');
});

router.post('/corporation', (req, res) => {
  if (!req.session.userDraft) {
    return res.redirect('/register');
  }

  const draft = req.session.userDraft;
  const corporationData = req.body;

  // TODO: Save draft.email, draft.password, draft.role + corporationData in DB

  req.session.userDraft = null;
  res.redirect('/login');
});

module.exports = router;