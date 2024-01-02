const User = require('../../models/User');

async function updateLastActive(req, res, next) {
  const userId = req.userId;

  try {
    await User.findByIdAndUpdate(userId, { lastActive: new Date() });
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateLastActive,
};
