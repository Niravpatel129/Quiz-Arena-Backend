const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Question = require('../models/Question');
require('dotenv').config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

async function checkImage(url) {
  // Check if the URL is valid
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.log(`Invalid URL: ${url}`);
    return false;
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType.startsWith('image/');
  } catch (error) {
    console.error(`Error checking image at ${url}:`, error);
    return false;
  }
}

async function checkAllQuestionImages() {
  try {
    const questions = await Question.find({ helperImage: { $exists: true, $ne: null } });

    for (const question of questions) {
      if (question.helperImage) {
        const isValidImage = await checkImage(question.helperImage);
        if (!isValidImage) {
          console.log(
            `Invalid or inaccessible image for question ID ${question.category} ${question.subCategory} ${question._id}: ${question.helperImage}`,
          );

          //   delete the question.helperImage
          question.helperImage = null;
          await question.save();
        }
      }
    }

    console.log('Image check completed.');
  } catch (error) {
    console.error('Error checking question images:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkAllQuestionImages();
