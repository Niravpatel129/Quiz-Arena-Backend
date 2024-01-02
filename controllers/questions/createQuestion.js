const QuestionModel = require('../../models/Question');

const createQuestion = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Invalid input format. Expected an array.' });
    }

    const results = await Promise.all(
      req.body.map(async (questionData) => {
        const { question, category, parentCategory, answers, correctAnswer, helperImage } =
          questionData;

        if (
          typeof question !== 'string' ||
          typeof category !== 'string' ||
          typeof parentCategory !== 'string' ||
          !Array.isArray(answers) ||
          typeof correctAnswer !== 'string' ||
          typeof helperImage !== 'string'
        ) {
          return null; // Invalid data, skip this object
        }

        const formattedQuestionData = {
          question,
          category: category.toLowerCase(),
          parentCategory,
          answers,
          correctAnswer,
          helperImage,
        };

        try {
          const question = new QuestionModel(formattedQuestionData);
          const savedQuestion = await question.save();
          return savedQuestion;
        } catch (err) {
          if (err.code === 11000) {
            // Log duplicate key error and return null to indicate skipping
            console.error('Duplicate question detected, skipping');
            return null;
          }
          throw err; // Re-throw other errors to be caught by outer try-catch
        }
      }),
    );

    // Filter out null values which represent skipped duplicates or invalid data
    const filteredResults = results.filter((result) => result !== null);

    res.status(201).json(filteredResults);
  } catch (err) {
    console.log('🚀  err:', err);
    console.error('createQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = createQuestion;
