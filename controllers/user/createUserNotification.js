const { sendPushNotifications } = require('../../helpers/sendPushNotifications');
const User = require('../../models/User');

const createUserNotification = async (req, res) => {
  try {
    const { receiverId, type, options, receiverName } = req.body;

    const userId = req.userId;
    let message = '';

    const senderUser = await User.findById(userId);
    let recieverUser = null;
    if (receiverId) recieverUser = await User.findById(receiverId);
    if (receiverName)
      recieverUser = await User.findOne({ username: new RegExp('^' + receiverName + '$', 'i') });

    // user who is receiving the notification

    if (type === 'gameInvite') {
      message = `${senderUser.username || 'Player'} has invited you to a game in ${
        options.category || 'General'
      }!`;
    }

    if (type === 'friendRequest') {
      message = `${senderUser.username || 'Player'} has sent you a friend request!`;
    }

    const Notification = {
      type,
      from: userId,
      message,
      options,
    };

    if (!recieverUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    recieverUser.notifications.push(Notification);

    await recieverUser.save();

    // if recieverUser has misc.pushToken send push notification
    if (recieverUser.misc?.pushToken) {
      sendPushNotifications([recieverUser.misc.pushToken], message);
    }

    res.status(200).json({ message: 'Notification created' });
  } catch (error) {
    console.log('🚀  error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = createUserNotification;
