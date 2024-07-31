const User = require('../../models/User');

const updateAllAvatars = async () => {
  const randomAvatars = [
    'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-floating-wout-bg.png?alt=media&token=15741842-42aa-4277-9e09-952c0b6483ee',
    'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-thinking-wout-bg.png?alt=media&token=6485312e-2ae8-4fa7-8969-841e51854bca',
    'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-angry-wout-bg.png?alt=media&token=160ffcfe-e558-4137-9358-09b98a6b1e0f',
    'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Ffree-axolotl-laying-wout-bg.png?alt=media&token=5d450f0b-426e-483e-827c-cfdf4a0c9039',
  ];

  try {
    const users = await User.find({});
    let updatedCount = 0;

    for (const user of users) {
      const randomAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];

      if (!user.profile) {
        user.profile = { avatar: randomAvatar };
      } else {
        user.profile.avatar = randomAvatar;
      }

      await user.save();
      updatedCount++;
    }

    console.log(`Updated ${updatedCount} users' avatars.`);
    return updatedCount;
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

    let isUpdated = false;

    if (username !== undefined) {
      user.username = username;
      isUpdated = true;
    }

    if (avatar !== undefined) {
      if (!user.profile) {
        user.profile = { avatar };
      } else {
        user.profile.avatar = avatar;
      }
      isUpdated = true;
    }

    if (isUpdated) {
      await user.save();
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      avatar: user.profile?.avatar,
      username: user.username,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

module.exports = updateAvatar;
