require('dotenv').config();
const { default: mongoose } = require('mongoose');
const QuestionModel = require('../../models/Question');
const validateQuestionsUsingAPI = require('./validateQuestionsUsingAPI');
const fs = require('fs');
const path = require('path');

// MongoDB connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const validateQuestion = (question) => {
  const correctAnswers = question.answers.filter((answer) => answer.isCorrect);
  if (correctAnswers.length !== 1) {
    return false; // Provide a reason for the failure
  }
  if (question.correctAnswer !== correctAnswers[0].optionText) {
    return false; // Provide a reason for the failure
  }
  return true;
};

const checkQuestionQuality = async () => {
  const categories = ['league of legends']; // Extend this array with other categories as needed
  const validationResults = [];

  for (const category of categories) {
    const questions = await QuestionModel.find({ category });

    for (const question of questions) {
      let questionValidationResult = `Question ID: ${question._id} in category ${category}:`;

      if (!validateQuestion(question)) {
        questionValidationResult += `\n- Failed initial validation: Check correct answer configuration.`;
        validationResults.push(questionValidationResult);
        continue; // Skip further checks if initial validation fails
      }

      const isValidAndFeedback = await validateQuestionsUsingAPI(question);
      if (!isValidAndFeedback.isValid) {
        questionValidationResult += `\n- Failed validation checks:\n${isValidAndFeedback.feedback.join(
          '\n',
        )}`;
      } else {
        questionValidationResult += `\n- Passed all validation checks.`;
      }

      console.log(questionValidationResult);
      validationResults.push(questionValidationResult);
    }
  }

  // Write the accumulated results to a text file, now including AI feedback
  const filePath = path.join(__dirname, 'detailedValidationResults.txt');
  fs.writeFileSync(filePath, validationResults.join('\n\n'));
  console.log(`All questions checked. Detailed results written to ${filePath}`);
};

checkQuestionQuality();
