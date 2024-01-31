const Question = require('../../models/Question');

const getQuestions = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const startOrder = parseInt(req.query.startOrder) || 0;

    const questions = await Question.find({ order: { $gte: startOrder } })
      .sort('order')
      .limit(count);

    res.json(questions);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = getQuestions;
