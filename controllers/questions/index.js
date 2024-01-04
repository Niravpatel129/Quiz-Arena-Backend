const getAllQuestions = require('./getAllQuestions');
const createQuestion = require('./createQuestion');
const deleteQuestion = require('./deleteQuestion');
const updateQuestion = require('./updateQuestion');
const downvoteQuestion = require('./downvoteQuestion');
const upvoteQuestion = require('./upvoteQuestion');

module.exports = {
  getAllQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  downvoteQuestion,
  upvoteQuestion,
};
