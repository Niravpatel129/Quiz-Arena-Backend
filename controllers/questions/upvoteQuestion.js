const QuestionModel = require('../../models/Question');

const upvoteQuestion = async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await QuestionModel.findById(questionId);
    question.upvotes = question.upvotes + 1;
    await question.save();
    res.status(200).json(question);
  } catch (err) {
    console.error('upvoteQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = upvoteQuestion;
