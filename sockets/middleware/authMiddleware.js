const jwt = require('jsonwebtoken');
const cookieParser = require('../../helpers/parseCookies');
require('dotenv').config();

const authMiddleware = (socket, next) => {
  let token = socket.request.headers.cookie;
  token = cookieParser(token).token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('🚀  err:', err);
      return next(new Error('Authentication error'));
    }

    socket.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
