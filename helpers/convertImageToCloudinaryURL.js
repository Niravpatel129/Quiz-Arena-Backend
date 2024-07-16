const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // UUID for unique file naming
const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage client
const storage = new Storage({
  projectId: 'quiz-arena-e2415',
  keyFilename: 'quiz-arena-e2415-firebase-adminsdk-c1083-9b227fe460.json',
});

const bucketName = 'quiz-arena-e2415.appspot.com';

const convertImageToFirebaseURL = async (imageUrl) => {
  try {
    // check if imageUrl is valid image
    const isValidImage = await axios.head(imageUrl);
    if (isValidImage.status !== 200) {
      return 'https://storage.googleapis.com/quiz-arena-e2415.appspot.com/avatars/659cd4cef8bb297c1b3c3f38-1716018554690.jpg';
    }

    // if the imageUrl is already in Firebase storage, just return it
    if (imageUrl.includes('firebase')) {
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

    // Upload the image to Firebase Storage
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(`images/${tempFilename}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    await new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error('Error uploading image to Firebase Storage:', err);
        reject(err);
      });
      blobStream.on('finish', async () => {
        await blob.makePublic();
        resolve();
      });
      blobStream.end(fs.readFileSync(newAvatarPath));
    });

    // Get the public URL of the uploaded image
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    // Delete the local image file after upload
    fs.unlinkSync(newAvatarPath);

    // Return the Firebase URL
    return publicUrl;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

module.exports = convertImageToFirebaseURL;
