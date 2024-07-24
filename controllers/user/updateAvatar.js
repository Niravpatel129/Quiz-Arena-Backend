const User = require('../../models/User');

const updateAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const { avatar, username } = req.body;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username;
    user.profile.avatar = avatar;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      avatar: user.profile.avatar,
      username: user.profile.username,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

module.exports = updateAvatar;
