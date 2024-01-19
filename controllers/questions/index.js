const getAllQuestions = require('./getAllQuestions');
const createQuestion = require('./createQuestion');
const deleteQuestion = require('./deleteQuestion');
const updateQuestion = require('./updateQuestion');
const downvoteQuestion = require('./downvoteQuestion');
const upvoteQuestion = require('./upvoteQuestion');
const getQuestionsByCategory = require('./getQuestionsByCategory');
const listAllCategories = require('./listAllCategories');

module.exports = {
  getAllQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  downvoteQuestion,
  upvoteQuestion,
  getQuestionsByCategory,
  listAllCategories,
};
