const fs = require('fs');
require('dotenv').config();
const mongoose = require('mongoose');
const { Storage } = require('@google-cloud/storage');
const fetch = require('node-fetch');

// Initialize Google Cloud Storage client
const storage = new Storage({
  projectId: 'quiz-arena-e2415',
  keyFilename: 'quiz-arena-e2415-firebase-adminsdk-c1083-9b227fe460.json',
});

// Connect to the database
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

// Import the User model
const User = require('../../models/User');

const isValidImage = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType && contentType.startsWith('image/');
  } catch (error) {
    console.error('Error checking image validity:', url, error);
    return false;
  }
};

const updateAvatars = async () => {
  const users = await User.find({
    'profile.avatar': { $regex: /cloudinary/ },
  });

  for (const user of users) {
    const avatarUrl = user.profile.avatar;
    console.log('Processing avatar:', avatarUrl);

    try {
      // Check if the avatar URL is valid
      const isValid = await isValidImage(avatarUrl);
      if (!isValid) {
        console.warn('Invalid avatar URL:', avatarUrl);
        // reset the avatar to: https://storage.googleapis.com/quiz-arena-e2415.appspot.com/avatars/659cd4cef8bb297c1b3c3f38-1716018554690.jpg
        user.profile.avatar =
          'https://storage.googleapis.com/quiz-arena-e2415.appspot.com/avatars/659cd4cef8bb297c1b3c3f38-1716018554690.jpg';
        await user.save();
        console.log('User updated with default avatar:', user._id);
        continue;
      }

      // Fetch the image data from the URL
      const response = await fetch(avatarUrl);
      const buffer = await response.buffer();

      // Generate a unique filename for the avatar
      const timestamp = Date.now();
      const filename = `avatars/${user._id}-${timestamp}.jpg`;

      // Upload the avatar to Google Cloud Storage
      const bucket = storage.bucket('quiz-arena-e2415.appspot.com');
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: 'image/jpeg',
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error(err);
          reject(err);
        });
        blobStream.on('finish', async () => {
          await blob.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          console.log('Avatar uploaded:', publicUrl);
          resolve(publicUrl);
        });
        blobStream.end(buffer);
      });

      // Update the user's profile.avatar field with the Google Cloud Storage URL
      user.profile.avatar = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      await user.save();
      console.log('User updated with Google Cloud Storage URL:', user._id);
    } catch (error) {
      console.error('Error processing avatar:', avatarUrl, error);
    }

    console.log('----------------------------------------');
  }

  console.log('Avatar update completed.');
  process.exit(0);
};

updateAvatars();
