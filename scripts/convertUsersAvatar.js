const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

const updateUserAvatars = async () => {
  try {
    const users = await User.find({
      'profile.avatar': { $exists: true },
    });

    for (const user of users) {
      user.profile.avatar =
        'https://static.vecteezy.com/system/resources/thumbnails/022/963/918/small_2x/ai-generative-cute-cat-isolated-on-solid-background-photo.jpg';
      await user.save();
      console.log(`Updated avatar for user: ${user.username}`);
    }

    console.log(`Done updating avatars for ${users.length} users`);
  } catch (err) {
    console.log('Error:', err.message);
  }
};

updateUserAvatars();

module.exports = updateUserAvatars;
