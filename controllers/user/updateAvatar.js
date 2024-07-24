const User = require('../../models/User');

const updateAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const { userAvatar } = req.body;

    if (!userAvatar) {
      return res.status(400).json({ message: 'User avatar is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profile = user.profile || {};
    user.profile.avatar = userAvatar;

    await user.save();

    res.status(200).json({ message: 'Avatar updated successfully', avatar: user.profile.avatar });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = updateAvatar;
