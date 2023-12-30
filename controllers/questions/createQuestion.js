const QuestionModel = require('../../models/Question');

const createQuestion = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Invalid input format. Expected an array.' });
    }

    // Use Promise.all to handle multiple asynchronous operations
    const results = await Promise.all(
      req.body.map(async (questionData) => {
        // Check if the question already exists
        const existingQuestion = await QuestionModel.findOne({ content: questionData.content });
        if (existingQuestion) {
          console.log('Duplicate question found:', questionData.content);
          return null; // Skip adding this question
        }

        const question = new QuestionModel(questionData);
        return question.save();
      }),
    );

    // Filter out null values (skipped questions)
    const addedQuestions = results.filter((result) => result !== null);

    res.status(201).json(addedQuestions);
  } catch (err) {
    console.error('createQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = createQuestion;
