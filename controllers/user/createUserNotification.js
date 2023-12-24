const User = require('../../models/User');

const createUserNotification = async (req, res) => {
  try {
    const { userId, notification } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.notifications.push(notification);
    await user.save();
    res.status(200).json({ message: 'Notification created' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = createUserNotification;
