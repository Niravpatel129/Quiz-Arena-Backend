const Question = require('../../models/Question');

const updateQuestion = async (req, res) => {
  try {
    const userId = req.userId; // Assuming this is correctly populated from authentication middleware
    const { id } = req.params; // ID of the question to update

    // Array of admin IDs
    const adminIds = [
      '65a281db0a28fced58f6e06d',
      '65977a0767ddfcc07f94fae4',
      '65d02a512cb0706eede1658d',
    ];

    const isAdmin = adminIds.includes(userId);

    const questionToUpdate = await Question.findById(id);
    if (!questionToUpdate) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (!isAdmin && !questionToUpdate.addedBy && questionToUpdate.category !== 'space') {
      // If the question does not have an owner and the category is not 'space', reject the update
      return res.status(400).json({
        message: "Question does not have an owner specified and is not in the 'space' category",
      });
    }

    // Check if the current user is the owner of the question, an admin, or if the category is 'space'
    if (
      questionToUpdate?.addedBy?.toString() !== userId &&
      !isAdmin &&
      questionToUpdate.category !== 'space'
    ) {
      return res.status(403).json({ message: 'Unauthorized to update this question' });
    }

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
