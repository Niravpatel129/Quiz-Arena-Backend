const Question = require('../../models/Question');

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const questionToUpdate = await Question.findByPk(id);
    if (questionToUpdate) {
      questionToUpdate.question = question;
      questionToUpdate.answer = answer;
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
