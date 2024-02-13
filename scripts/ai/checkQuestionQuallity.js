require('dotenv').config();
const { default: mongoose } = require('mongoose');
const QuestionModel = require('../../models/Question');
const validateQuestionsUsingAPI = require('./validateQuestionsUsingAPI');

// MongoDB connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const validateQuestion = (question) => {
  // Check if only one answer is marked as correct
  const correctAnswers = question.answers.filter((answer) => answer.isCorrect);
  if (correctAnswers.length !== 1) {
    return false;
  }

  // Check if correctAnswer matches the text of the marked correct answer
  if (question.correctAnswer !== correctAnswers[0].optionText) {
    return false;
  }

  // Additional formatting checks can be added here

  return true;
};

const checkQuestionQuality = async () => {
  const questions = await QuestionModel.find({ category: 'biology' });

  for (const question of questions) {
    if (validateQuestion(question)) {
      const isValid = await validateQuestionsUsingAPI(question);
      if (isValid) {
        // console.log(`Question ID: ${question._id} is valid.`);
      } else {
        // console.log(`Question ID: ${question._id} failed API validation.`);
      }
    } else {
      console.log(`Question ID: ${question._id} failed initial validation.`);
    }
  }
  console.log('All questions checked.');
};

checkQuestionQuality();
