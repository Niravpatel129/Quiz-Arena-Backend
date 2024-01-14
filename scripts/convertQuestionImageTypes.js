const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const Question = require('../models/Question');

const convertQuestionImageTypes = async () => {
  try {
    const questions = await Question.find({});

    let index = 0;

    for (const question of questions) {
      if (
        !question.helperImage ||
        question.helperImage.endsWith('.jpeg') ||
        (question.helperImage.endsWith('.jpg') && question.helperImage.includes('cloudinary')) ||
        question.helperImage.includes('cloudinary')
      ) {
        continue;
      } else {
        try {
          const response = await axios({
            method: 'get',
            url: question.helperImage,
            responseType: 'arraybuffer',
          });

          if (!response.data) {
            continue;
          }

          const newHelperImage = path.join(__dirname, 'questionsImage', `question-${index}.jpeg`);

          await sharp(response.data).toFormat('jpeg').toFile(newHelperImage);
          const formData = new FormData();

          formData.append('file', fs.createReadStream(newHelperImage));
          formData.append('upload_preset', 'gamercoach');

          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/gamercoach/image/upload?api_key=997981818793491`,
            formData,
          );

          if (uploadResponse.data.secure_url) {
            question.helperImage = uploadResponse.data.secure_url;
            await question.save();
          }

          console.log('Converting helperImage', question.helperImage);

          index++;

          // delete local image file
          fs.unlinkSync(newHelperImage);
        } catch (error) {}
      }
    }

    console.log('Done' + ' ' + index + ' ' + 'questions');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = convertQuestionImageTypes;
