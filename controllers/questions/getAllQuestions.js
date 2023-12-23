const QuestionModel = require('../../models/Question');

const getAllQuestions = (req, res) => {
  QuestionModel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error('getAllQuestions', err);
      res.status(500).json({ message: 'Something went wrong' });
    });
};

module.exports = getAllQuestions;
