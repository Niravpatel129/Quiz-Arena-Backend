const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
