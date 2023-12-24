// Mock function to simulate fetching questions from a database or API
const easyQuestions = require('./questions/easy_questions');

const timeLimit = 10;
const totalNumberOfRounds = 8;

async function fetchQuestionsForCategory(category, numberOfRounds) {
  const questions = [];

  for (let i = 0; i < numberOfRounds; i++) {
    const randomIndex = Math.floor(Math.random() * easyQuestions.length);

    questions.push({
      questionText: easyQuestions[randomIndex].questionText,
      options: easyQuestions[randomIndex].options,
      correctAnswer: easyQuestions[randomIndex].correctAnswer,
      helperImage: easyQuestions[randomIndex].helperImage,
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
