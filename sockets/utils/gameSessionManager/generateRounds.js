// Mock function to simulate fetching questions from a database or API
const easyQuestions = require('./questions/easy_questions');

const timeLimit = 10;
async function fetchQuestionsForCategory(category, numberOfRounds) {
  // Fetch questions based on the category and number of rounds
  // This is a placeholder - you'll need to implement the actual logic
  // depending on your data source (database, external API, etc.)
  // get random index from easyQuestions
  // 0 to easyQuestions.length - 1

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
  const numberOfRounds = 3; // Define the number of rounds per game
  const rounds = await fetchQuestionsForCategory(category, numberOfRounds);
  return rounds;
}

module.exports = generateRoundsForCategory;
