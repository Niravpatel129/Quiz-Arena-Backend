const fs = require('fs');
require('dotenv').config();
const mongoose = require('mongoose');
const { Storage } = require('@google-cloud/storage');
const fetch = require('node-fetch');
const sharp = require('sharp');

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

const optimizeImage = async (buffer) => {
  try {
    return await sharp(buffer)
      .resize(300, 300, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 90 })
      .toBuffer();
  } catch (error) {
    console.error('Error optimizing image:', error);
    return buffer;
  }
};

const uploadToGCS = async (bucket, buffer, filename, contentType) => {
  const blob = bucket.file(filename);
  const blobStream = blob.createWriteStream({
    metadata: { contentType },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', reject);
    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(buffer);
  });
};

const updateAvatars = async () => {
  const users = await User.find({});
  const bucket = storage.bucket('quiz-arena-e2415.appspot.com');
  const defaultAvatarUrl =
    'https://storage.googleapis.com/quiz-arena-e2415.appspot.com/avatars/659cd4cef8bb297c1b3c3f38-1716018554690.jpg';

  for (const user of users) {
    const avatarUrl = user.profile.avatar;
    console.log('Processing avatar for user:', user._id);

    try {
      const isValid = await isValidImage(avatarUrl);
      if (!isValid) {
        console.warn('Invalid avatar URL:', avatarUrl);
        user.profile.avatar = defaultAvatarUrl;
        await user.save();
        console.log('User updated with default avatar:', user._id);
        continue;
      }

      const response = await fetch(avatarUrl);
      const buffer = await response.buffer();

      const optimizedBuffer = await optimizeImage(buffer);

      const timestamp = Date.now();
      const filename = `avatars/${user._id}-${timestamp}.webp`;

      const newAvatarUrl = await uploadToGCS(bucket, optimizedBuffer, filename, 'image/webp');

      user.profile.avatar = newAvatarUrl;
      await user.save();
      console.log('User updated with optimized Google Cloud Storage URL:', user._id);
    } catch (error) {
      console.error('Error processing avatar:', avatarUrl, error);
      user.profile.avatar = defaultAvatarUrl;
      await user.save();
      console.log('User updated with default avatar due to error:', user._id);
    }
  }

  console.log('Avatar update completed for all users.');
  process.exit(0);
};

updateAvatars().catch(console.error);
