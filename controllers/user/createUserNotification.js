const { sendPushNotifications } = require('../../helpers/sendPushNotifications');
const User = require('../../models/User');

const createUserNotification = async (req, res) => {
  try {
    const { receiverId, type, options, receiverName } = req.body;
    const userId = req.userId;

    if (!receiverId && !receiverName)
      return res.status(400).json({ message: 'Missing receiverId or receiverName' });

    if (userId === receiverId)
      return res.status(400).json({ message: 'Cannot send notification to yourself' });

    let message = '';

    const senderUser = await User.findById(userId);
    if (!senderUser) return res.status(404).json({ message: 'User not found' });

    let recieverUser = null;
    if (receiverId) recieverUser = await User.findById(receiverId);
    if (receiverName)
      recieverUser = await User.findOne({ username: new RegExp('^' + receiverName + '$', 'i') });

    if (type === 'friendRequest') {
      const duplicate = recieverUser?.notifications?.find(
        (notification) =>
          notification.type === 'friendRequest' && notification.from.toString() === userId,
      );

      console.log('🚀  duplicate friend');
      if (duplicate) return res.status(200).json({ message: 'User is already your friend' });
    }

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
      sendPushNotifications(null, [recieverUser.misc.pushToken], message);
    }

    res.status(200).json({ message: 'Notification created' });
  } catch (error) {
    console.log('🚀  error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = createUserNotification;
