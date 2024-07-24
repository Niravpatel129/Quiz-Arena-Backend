const User = require('../../models/User');

const updateAllAvatars = async () => {
  try {
    const defaultAvatar =
      'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-jumping-in-air-wout-bg.png?alt=media&token=82811efc-ba1e-4bed-b37f-a3cc09bc1dbb';

    const result = await User.updateMany(
      { profile: { $exists: true, $ne: null } },
      { $set: { 'profile.avatar': defaultAvatar } },
      { upsert: false },
    );

    console.log(`Updated ${result.modifiedCount} users' avatars.`);
    return result.modifiedCount;
  } catch (error) {
    console.error('Error updating all avatars:', error);
    throw error;
  }
};

// updateAllAvatars();

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
      username: user.username,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

module.exports = updateAvatar;
