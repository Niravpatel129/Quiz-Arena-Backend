const Question = require('../../../models/Question');

const timeLimit = 10;
const totalNumberOfRounds = 7;

async function fetchQuestionsForCategory(category, numberOfRounds) {
  if (!category) return null;

  const questionsModel = await Question.find({ category: category.toLowerCase() });

  if (questionsModel.length === 0) return null;

  const questions = [];

  for (let i = 0; i < numberOfRounds; i++) {
    const randomIndex = Math.floor(Math.random() * questionsModel.length);

    questions.push({
      questionText: questionsModel[randomIndex].question,
      options: questionsModel[randomIndex].answers,
      correctAnswer: questionsModel[randomIndex].correctAnswer,
      helperImage: questionsModel[randomIndex].helperImage,
      timeLimit: timeLimit,
      category: category,
      roundNumber: i + 1,
    });
  }

  return questions;
}

// Function to generate rounds for a given category
async function generateRoundsForCategory(category) {
  const rounds = await fetchQuestionsForCategory(category, totalNumberOfRounds);
  return rounds;
}

module.exports = generateRoundsForCategory;
