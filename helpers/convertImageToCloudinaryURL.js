const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid'); // UUID for unique file naming

const convertImageToCloudinaryURL = async (imageUrl) => {
  try {
    // Download the image
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'arraybuffer',
    });

    // Save the image locally after resizing, using a UUID for the filename
    const tempFilename = `${uuidv4()}.jpeg`;
    const newAvatarPath = path.join(__dirname, 'avatars', tempFilename);
    await sharp(response.data).resize({ width: 200 }).toFormat('jpeg').toFile(newAvatarPath);

    // Prepare form data for upload
    const formData = new FormData();
    formData.append('file', fs.createReadStream(newAvatarPath));
    formData.append('upload_preset', 'gamercoach');

    // Upload the image to Cloudinary
    const uploadResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/gamercoach/image/upload?api_key=997981818793491`,
      formData,
    );

    // Delete the local image file after upload
    fs.unlinkSync(newAvatarPath);

    // Return the Cloudinary URL
    if (uploadResponse.data.secure_url) {
      return uploadResponse.data.secure_url;
    }

    throw new Error('Failed to get secure URL from Cloudinary');
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

module.exports = convertImageToCloudinaryURL;
