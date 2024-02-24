const sharp = require('sharp');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const Question = require('../models/Question');
const { default: mongoose } = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

const convertQuestionImageTypes = async () => {
  try {
    console.log('Converting question images');

    const questions = await Question.find({
      helperImage: { $nin: [null, /cloudinary/], $exists: true, $ne: '' },
    });

    let index = 0;

    for (const question of questions) {
      try {
        // Check if the image is already in the desired format or hosted on Cloudinary
        if (!question.helperImage) {
          continue;
        }

        if (question.helperImage.includes('cloudinary')) {
          continue;
        }

        const response = await axios({
          method: 'get',
          url: question.helperImage,
          responseType: 'arraybuffer',
          timeout: 5000,
        });

        if (!response.data) {
          continue;
        }

        const newHelperImage = path.join(__dirname, 'questionsImage', `question-${index}.jpeg`);
        await sharp(response.data)
          .resize({ width: 400 })
          .sharpen()
          .toFormat('jpeg', { quality: 90 })
          .toBuffer()
          .then((data) => {
            return sharp(data)
              .flatten({ background: { r: 255, g: 255, b: 255 } }) // This changes black to white
              .jpeg({ quality: 90 })
              .toFile(newHelperImage);
          });

        return;

        const formData = new FormData();

        formData.append('file', fs.createReadStream(newHelperImage));
        formData.append('upload_preset', 'gamercoach');

        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/gamercoach/image/upload?api_key=997981818793491`,
          formData,
          {
            timeout: 5000,
          },
        );

        if (uploadResponse.data.secure_url) {
          question.helperImage = uploadResponse.data.secure_url;
          await question.save();
        }

        console.log('Converted helperImage', question.helperImage);
        index++;

        // delete local image file
        fs.unlinkSync(newHelperImage);
      } catch (error) {
        console.log(`Error with image: ${question.helperImage}. Error: ${error.message}`);
        // Continue to the next image despite the error
      }
    }

    console.log('Done converting ' + index + ' questions');
  } catch (err) {
    console.error('Error in main process:', err.message);
  }
};

convertQuestionImageTypes();

module.exports = convertQuestionImageTypes;
