const Question = require('../../models/Question');

const getQuestionsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const question = await Question.find({ category });

    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getQuestionsByCategory;
