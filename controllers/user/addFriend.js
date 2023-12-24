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

    // Check if the friend is already in the user's friend list
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already friends' });
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
