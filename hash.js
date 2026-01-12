const bcrypt = require('bcrypt');

(async () => {
  const hash = '$2b$10$mzJXkf1cERdByhBu516gRufI64LwgWeG3Dj3mL6ysdRgXsZGx0DDa';
  const match = await bcrypt.compare('admin123', hash);
  console.log('Password matches?', match);
})();