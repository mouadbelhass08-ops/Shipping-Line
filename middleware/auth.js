function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

function requireRole(roleId) {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      const userRole = req.session.user.role_id;
      if (userRole === roleId) {
        return next();
      }
    }
    res.status(403).send('Forbidden');
  };
}

function requireStep1(req, res, next) {
  if (req.session.registrationStep1) {
    next();
  } else {
    res.redirect('/register');
  }
}

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login?timeout=1'); // redirect if expired or not logged in
}

module.exports = { requireStep1, requireAuth, requireRole };