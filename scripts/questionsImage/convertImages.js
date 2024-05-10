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

// Import the Question model
const Question = require('../../models/Question');

const convertImages = async () => {
  const questions = await Question.find({
    // category: 'sports logos',
    // question:
    //   'Guess the prehistoric animal: A large, carnivorous marine reptile with a streamlined body and four flippers, lived during the Jurassic period.',
    helperImage: { $nin: [null, /cloudinary/], $exists: true, $ne: '' },
  });

  for (const question of questions) {
    const imageUrl = question.helperImage;
    console.log('Processing image:', imageUrl);

    try {
      // Fetch the image data from the URL
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();

      // Generate a unique filename for the image
      const timestamp = Date.now();
      const filename = `images/${question._id}-${timestamp}.jpg`;

      // Upload the image to Google Cloud Storage
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
          console.log('Image uploaded:', publicUrl);
          resolve(publicUrl);
        });
        blobStream.end(buffer);
      });

      // Update the question's helperImage field with the Google Cloud Storage URL
      question.helperImage = blob.publicUrl();
      await question.save();

      console.log('Question updated with Google Cloud Storage URL:', question._id);
    } catch (error) {
      console.error('Error processing image:', imageUrl, error);
    }
  }

  console.log('Image conversion completed.');
  process.exit(0);
};

convertImages();
