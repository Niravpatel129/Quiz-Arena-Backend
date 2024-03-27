const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid'); // UUID for unique file naming

const convertImageToCloudinaryURL = async (imageUrl) => {
  try {
    // if the imageUrl is already cloudinary just return cloudinary
    if (imageUrl.includes('cloudinary')) {
      return imageUrl;
    }

    // Download the image
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'arraybuffer',
    });

    // Define the folder and file paths
    const folderPath = path.join(__dirname, 'image_folder'); // Local folder
    const tempFilename = `${uuidv4()}.jpeg`;
    const newAvatarPath = path.join(folderPath, tempFilename);

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Save the image locally after resizing, using a UUID for the filename
    await sharp(response.data).resize({ width: 300 }).toFormat('jpeg').toFile(newAvatarPath);

    // Prepare form data for upload
    const formData = new FormData();
    formData.append('file', fs.createReadStream(newAvatarPath));
    formData.append('upload_preset', 'gamercoach');

    // Upload the image to Cloudinary
    const uploadResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/gamercoach/image/upload?api_key=${process.env.CLOUDINARY_API_KEY}`,
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
