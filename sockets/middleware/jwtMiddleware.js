const jwt = require('jsonwebtoken');
const bannedUsers = ['nvsroc1@gmail.com'];

const verifyToken = (req, res, next) => {
  const token = req.headers?.cookie?.split('=')[1];

  if (!token) return next(401, 'You are not authenticated!');

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(403, 'Token is not valid!');

    req.userId = payload.user.id;

    // dont allow any banned users
    if (bannedUsers.includes(payload.user.username)) {
      return next(createError(401, 'User not allowed!'));
    }

    next();
  });
};

module.exports = {
  verifyToken,
};
