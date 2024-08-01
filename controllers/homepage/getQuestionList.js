const categories = require('../../helpers/categoriesList2');

const getQuestionList = async (req, res) => {
  try {
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getQuestionList;
