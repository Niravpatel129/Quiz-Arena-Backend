const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const User = require('../models/User');

const convertUserAvatars = async () => {
  let index = 0;
  try {
    const users = await User.find({});

    for (const user of users) {
      if (!user.profile.avatar) continue;

      if (
        (user.profile.avatar.endsWith('.jpg') && user.profile.avatar.includes('cloudinary')) ||
        user.profile.avatar.endsWith('.jpg')
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

        await sharp(response.data).toFormat('jpeg').toFile(newAvatarPath);

        const formData = new FormData();
        formData.append('file', fs.createReadStream(newAvatarPath));
        formData.append('upload_preset', 'gamercoach');

        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/gamercoach/image/upload?api_key=997981818793491`,
          formData,
        );

        if (uploadResponse.data.secure_url) {
          user.profile.avatar = uploadResponse.data.secure_url;
          await user.save();
        }

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
    console.error(err.message);
  }
};

module.exports = convertUserAvatars;
