const User = require('../../models/User');

const addFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.friends.push(friendId);
    friend.friends.push(userId);
    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend added' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = addFriend;
