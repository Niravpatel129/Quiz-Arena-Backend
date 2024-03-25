const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const FormData = require('form-data');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

const convertUserAvatars = async () => {
  let index = 0;
  try {
    const users = await User.find({
      'profile.avatar': { $exists: true },
    });

    for (const user of users) {
      if (!user.profile.avatar) continue;

      if (
        user.profile.avatar.includes('cloudinary') ||
        (user.profile.avatar.includes('cloudinary') && user.profile.avatar.endsWith('.jpg'))
      ) {
        continue;
      }

      try {
        const response = await axios({
          method: 'get',
          url: user.profile.avatar,
          responseType: 'arraybuffer',
        });

        const newAvatarPath = path.join(__dirname, 'avatars', `${user.username}.jpeg`);

        await sharp(response.data).resize({ width: 200 }).toFormat('jpeg').toFile(newAvatarPath);

        const formData = new FormData();
        formData.append('file', fs.createReadStream(newAvatarPath));
        formData.append('upload_preset', 'gamercoach');

        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/gamercoach/image/upload?api_key=${process.env.CLOUDINARY_API_KEY}`,
          formData,
        );
        console.log('🚀  uploadResponse:', uploadResponse.data.secure_url);

        if (uploadResponse.data.secure_url) {
          user.profile.avatar = uploadResponse.data.secure_url;
          await user.save();
        }

        console.log('🚀  uploadResponse.data.secure_url:', uploadResponse.data.secure_url);
        console.log(`Converted and uploaded new avatar for user: ${user.username}`);

        // delete local image file
        index += 1;
        fs.unlinkSync(newAvatarPath);
      } catch (error) {
        console.error(`Error processing avatar for user ${user.username}:`, error);
      }
    }

    console.log(`Done converting ${index} user avatars`);
  } catch (err) {
    console.log('🚀  err.message:', err.message);
  }
};

convertUserAvatars();

module.exports = convertUserAvatars;
