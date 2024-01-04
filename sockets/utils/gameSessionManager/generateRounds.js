const Question = require('../../../models/Question');

const timeLimit = 10;
const totalNumberOfRounds = 7;

async function fetchQuestionsForCategory(category, numberOfRounds) {
  if (!category) return null;

  const questionsModel = await Question.aggregate([
    { $match: { category: { $regex: new RegExp(category, 'i') } } },
    { $sample: { size: 10 } },
  ]);

  if (questionsModel.length === 0) return null;

  const questions = [];
  let usedQuestionAnswers = new Set(); // Set to track used question + correctAnswer pairs

  for (let i = 0; i < numberOfRounds; i++) {
    let randomIndex;
    let questionAnswerPair;

    if (!questionsModel[randomIndex]) return;

    do {
      randomIndex = Math.floor(Math.random() * questionsModel.length);
      questionAnswerPair = `${questionsModel[randomIndex].question}|${questionsModel[randomIndex].correctAnswer}`;
    } while (usedQuestionAnswers.has(questionAnswerPair)); // Ensure the pair has not been used before

    usedQuestionAnswers.add(questionAnswerPair); // Add the pair to the set

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
