const QuestionModel = require('../../models/Question');

const createQuestion = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Invalid input format. Expected an array.' });
    }

    // Use Promise.all to handle multiple asynchronous operations
    const results = await Promise.all(
      req.body.map((questionData) => {
        const question = new QuestionModel(questionData);
        return question.save();
      }),
    );

    res.status(201).json(results);
  } catch (err) {
    console.error('createQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = createQuestion;
