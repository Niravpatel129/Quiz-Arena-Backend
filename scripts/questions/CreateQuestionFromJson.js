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

      const isFormatCorrect = parsedData.every((question) => {
        const isAnswersCorrect = question.answers.every((answer) => {
          return answer.optionText && answer.isCorrect !== undefined;
        });

        const isCorrect = question.answers.some((answer) => answer.isCorrect);

        if (!isAnswersCorrect || !isCorrect) {
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
        process.exit(1);
      }

      for (const question of parsedData) {
        const existingQuestion = await Question.findOne({ question: question.question });
        if (existingQuestion) {
          // If the question exists, update it
          await Question.findByIdAndUpdate(existingQuestion._id, question);
        } else {
          // If the question does not exist, insert it as a new document
          await new Question(question).save();
        }
      }

      console.log('🚀  done processing');
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
}

processJsonFile('scripts/questions/myJson.json');
