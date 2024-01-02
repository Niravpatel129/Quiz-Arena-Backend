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

async function updateLastActiveSocket(userId) {
  try {
    if (!userId) return;

    await User.findByIdAndUpdate(userId, { lastActive: new Date() });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  updateLastActive,
  updateLastActiveSocket,
};
