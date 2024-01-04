const Question = require('../../../models/Question');

const timeLimit = 10;
const totalNumberOfRounds = 7;

async function fetchQuestionsForCategory(category, numberOfRounds) {
  console.log('Fetching questions for category: ', category);
  if (!category) return null;

  const questionsModel = await Question.aggregate([
    { $match: { category: { $regex: new RegExp(category, 'i') } } },
    { $sample: { size: 10 } },
  ]);

  if (questionsModel.length === 0) return null;

  const questions = [];
  let usedIndexes = new Set(); // Set to track used indexes

  for (let i = 0; i < numberOfRounds; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questionsModel.length);
    } while (usedIndexes.has(randomIndex)); // Ensure the index has not been used before

    usedIndexes.add(randomIndex); // Add the index to the set of used indexes

    questions.push({
      questionText: questionsModel[randomIndex].question,
      questionId: questionsModel[randomIndex]._id,
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
