const User = require('../../models/User');

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate('notifications');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ notifications: user.notifications });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getUserNotifications;
