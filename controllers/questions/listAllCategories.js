const Question = require('../../models/Question');

const listAllCategories = async (req, res) => {
  try {
    const categories = await Question.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = listAllCategories;
