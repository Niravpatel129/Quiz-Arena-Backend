const Question = require('../../models/Question');

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const questionToUpdate = await Question.findById(id);
    if (!questionToUpdate) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // make the req.body new
    const newQuestion = req.body;

    questionToUpdate.set(newQuestion);

    await questionToUpdate.save();

    return res.status(200).json(questionToUpdate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error updating question' });
  }
};

module.exports = updateQuestion;
