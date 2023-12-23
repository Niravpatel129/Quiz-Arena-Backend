const QuestionModel = require('../../models/Question');

const createQuestion = async (req, res) => {
  try {
    const question = new QuestionModel(req.body);
    const result = await question.save();
    res.status(201).json(result);
  } catch (err) {
    console.error('createQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = createQuestion;
