const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.cookie?.split('=')[1];
    console.log('🚀  token:', token);

    if (!token) return next(401, 'You are not authenticated!');

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        console.log(err);
        return next(403, 'Token is not valid!');
      }

      console.log('token is valid, continue');
      req.userId = payload.user?.id;
      req.name = payload.user?.name || payload.user?.username || 'anonymous';
      req.avatar = payload.user?.avatar || null;
      next();
    });
  } catch (err) {
    console.log(err);
    next(500, 'Something went wrong!');
  }
};

module.exports = {
  verifyToken,
};
