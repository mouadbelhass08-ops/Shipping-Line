module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  env: process.env.NODE_ENV || 'development'
};