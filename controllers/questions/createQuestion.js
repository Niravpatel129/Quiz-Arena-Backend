const QuestionModel = require('../../models/Question');

const createQuestion = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Invalid input format. Expected an array.' });
    }

    const results = await Promise.all(
      req.body.map((questionData) => {
        questionData.category = questionData.category.toLowerCase();

        const question = new QuestionModel(questionData);
        return question.save();
      }),
    );

    res.status(201).json(results);
  } catch (err) {
    console.error('createQuestion', err);

    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate question detected' });
    }

    res.status(500).json({ message: 'Something went wrong' });
  }
};

// const something = async () => {
//   console.log('something');
//   // Delete all questiosn with category: "General Knowledge"
//   const result = await QuestionModel.deleteMany({ category: 'General Knowledge' });

//   // Log the result of the deletion
//   console.log(`${result.deletedCount} questions deleted.`);
// };

// something();

module.exports = createQuestion;
