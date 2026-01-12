require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 125000;