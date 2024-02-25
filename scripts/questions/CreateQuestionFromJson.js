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

      // make sure the format is correct
      const isFormatCorrect = parsedData.every((question) => {
        // check question.answers has a optionText and isCorrect and isCorrect matches the isCorrect in the question object
        const isAnswersCorrect = question.answers.every((answer) => {
          return answer.optionText && answer.isCorrect !== undefined;
        });

        const isCorrect = question.answers.some((answer) => answer.isCorrect);

        // log out the question that is not correct

        if (!isAnswersCorrect) {
          return false;
        }

        if (!isCorrect) {
          return false;
        }

        if (
          !question.question ||
          !question.category ||
          !question.correctAnswer ||
          question.answers.length !== 4
        ) {
          return false;
        }

        return (
          question.question &&
          question.category &&
          question.correctAnswer &&
          question.answers.length === 4
        );
      });

      if (!isFormatCorrect) {
        console.error('Invalid format');
        // terminate the process
        process.exit(1);
      }

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
