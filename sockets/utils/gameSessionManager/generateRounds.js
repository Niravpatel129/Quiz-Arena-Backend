const Question = require('../../../models/Question');

const timeLimit = 13;
const totalNumberOfRounds = 7;

async function fetchQuestionsForCategory(category, numberOfRounds) {
  console.log('Fetching questions for category: ', category);
  if (!category) return null;

  const questionsModel = await Question.aggregate([
    { $match: { category: { $regex: new RegExp(category, 'i') } } },
    { $sample: { size: totalNumberOfRounds } },
  ]);

  if (questionsModel.length === 0) return null;

  const questions = questionsModel.map((question) => {
    return {
      questionId: question._id,
      questionCorrectAnswerRatio:
        (question.stats?.correctAnswers / question.stats?.totalAnswers) * 100 || 0,
      questionText: question.question,
      questionId: question._id,
      options: question.answers,
      correctAnswer: question.correctAnswer,
      helperImage: question.helperImage,
      timeLimit: timeLimit,
      category: category,
    };
  });

  return questions;
}

// Function to generate rounds for a given category
async function generateRoundsForCategory(category) {
  const rounds = await fetchQuestionsForCategory(category, totalNumberOfRounds);
  return rounds;
}

module.exports = generateRoundsForCategory;
