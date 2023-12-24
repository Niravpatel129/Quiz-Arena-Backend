const User = require('../../models/User');

const deleteNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const { notificationId } = req.params;

    // Use pull to remove the notification
    const updateResult = await User.updateOne(
      { _id: userId },
      { $pull: { notifications: { _id: notificationId } } },
    );

    // Check if the notification was found and removed
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('🚀 error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = deleteNotification;
