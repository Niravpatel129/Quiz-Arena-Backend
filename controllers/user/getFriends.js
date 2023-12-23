const User = require('../../models/User');

const getFriends = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getFriends;
