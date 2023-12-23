const Question = require('../../models/Question');

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const questionToUpdate = await Question.findById(id);
    if (questionToUpdate) {
      questionToUpdate = req.body;
      await questionToUpdate.save();
      res.json(questionToUpdate);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = updateQuestion;
