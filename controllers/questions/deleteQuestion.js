const QuestionModel = require('../../models/Question');

const deleteQuestion = async (req, res) => {
  try {
    const userId = req.userId; // Assuming this is correctly populated from authentication middleware
    const { id } = req.params; // ID of the question to delete

    const adminIds = [
      '65a281db0a28fced58f6e06d',
      '65977a0767ddfcc07f94fae4',
      '65d02a512cb0706eede1658d',
    ];

    const question = await QuestionModel.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (!question.addedBy) {
      return res.status(403).json({ message: 'Unauthorized to delete this question' });
    }

    const isAdmin = adminIds.includes(userId.toString());
    if (question.addedBy.toString() !== userId.toString() && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized to delete this question' });
    }

    const result = await QuestionModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Question deleted successfully', result });
  } catch (err) {
    console.error('deleteQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = deleteQuestion;
