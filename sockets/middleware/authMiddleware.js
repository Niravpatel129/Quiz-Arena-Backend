const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (socket, next) => {
  const token = socket.handshake.query.token;

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }

    socket.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
