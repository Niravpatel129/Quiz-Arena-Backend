const User = require('../../models/User');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const convertImageToCloudinaryURL = require('../../helpers/convertImageToCloudinaryURL');

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
        const response = await convertImageToCloudinaryURL(req?.body?.profile?.avatar);

        user.profile.avatar = response;
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
