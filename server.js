const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const initializeSockets = require('./sockets');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

app.use(
  cors({
    origin: [
      'http://localhost:19006',
      'https://soft-kataifi-4add35.netlify.app',
      'https://quiz-arena1.netlify.app',
      'http://localhost:3000',
      'https://lucky-taiyaki-f522c5.netlify.app',
      '*',
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeSockets(server, {
  cors: {
    origin: 'http://localhost:19006',
    credentials: true,
  },
});
