const User = require('../../models/User');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const updateUser = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });

    console.log('updateUser', req.body);
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const allowedUpdates = ['username', 'email', 'password', 'profile'];
    const updates = Object.keys(req.body);
    console.log('🚀  updates:', updates);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach(async (update) => {
      if (update === 'profile' && req?.body?.profile?.avatar) {
        const avatarUrl = req.body.profile.avatar;
        const response = await axios({ url: avatarUrl, responseType: 'arraybuffer' });
        const avatarBuffer = Buffer.from(response.data, 'binary');
        // create uploads folder if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, '../../uploads'))) {
          fs.mkdirSync(path.join(__dirname, '../../uploads'));
        }

        const newAvatarPath = path.join(__dirname, '../../uploads', `avatar-${req.userId}.jpeg`);

        await sharp(avatarBuffer).resize({ width: 200 }).toFormat('jpeg').toFile(newAvatarPath);

        user.profile.avatar = newAvatarPath;

        setTimeout(() => {
          fs.unlink(newAvatarPath, (err) => {
            if (err) console.error('Error deleting temporary avatar file:', err);
          });

          console.log('🚀  deleted temporary avatar file:', newAvatarPath);
        }, 5000);

        user.profile.avatar = req.body.profile.avatar ?? user.profile.avatar;
      } else {
        user[update] = req.body[update];
      }
    });

    await user.save();

    console.log('🚀  user updated profile:', user.username);

    res.json(user);
  } catch (err) {
    console.error('updateUser', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = updateUser;
