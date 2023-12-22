const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (socket, next) => {
  const token = socket.handshake.query.token;
  console.log('🚀  token:', token);

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('🚀  err:', err);
      return next(new Error('Authentication error'));
    }

    socket.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
