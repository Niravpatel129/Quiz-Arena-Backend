const { sendPushNotifications } = require('../../helpers/sendPushNotifications');
const User = require('../../models/User');

const syncContacts = async (req, res) => {
  try {
    const { emails } = req.body;
    const userId = req.userId;

    // Find the user and populate friends
    const user = await User.findById(userId).populate({
      path: 'friends',
      select: '_id username email profile.avatar misc.pushToken',
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out the emails that are already friends
    const nonFriendEmails = emails.filter(
      (email) => !user.friends.some((friend) => friend.email === email),
    );

    // Find users that are not already friends
    const newFriends = await User.find({
      email: { $in: nonFriendEmails },
    }).select('_id username email profile.avatar misc.pushToken');

    if (newFriends.length > 0) {
      user.friends = [...user.friends, ...newFriends.map((friend) => friend._id)];
      await user.save();
    }

    // send notification to new friends
    const newFriendIds = newFriends.map((friend) =>
      friend?.misc?.pushToken ? friend?.misc?.pushToken : null,
    );

    sendPushNotifications(null, newFriendIds, 'New friend', `${user.username} is on Quiz Arena!`);

    res.status(200).json({
      friends: user.friends,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = syncContacts;
