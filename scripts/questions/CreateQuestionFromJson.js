const fs = require('fs');
require('dotenv').config();
const mongoose = require('mongoose');

// connect to the database
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

// import the Question model
const Question = require('../../models/Question');

async function processJsonFile(filePath) {
  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    try {
      const parsedData = JSON.parse(data).map((question) => {
        question.category = question.category.toLowerCase();
        return question;
      });

      const array = parsedData;

      //   dont allow duplicates
      const questions = await Question.find({ question: { $in: array.map((q) => q.question) } });
      const questionsMap = questions.reduce((acc, q) => {
        acc[q.question] = q;
        return acc;
      }, {});

      const filteredArray = array.filter((q) => !questionsMap[q.question]);
      console.log('🚀  filteredArray length:', filteredArray.length);

      // add to the database
      await Question.insertMany(filteredArray);
      console.log('🚀  done adding');
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
}

processJsonFile('scripts/questions/myJson.json');
