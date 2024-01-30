const QuestionModel = require('../../models/Question');

const createQuestion = async (req, res) => {
  try {
    // let userId;

    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Invalid input format. Expected an array.' });
    }

    const maxOrderQuestion = await QuestionModel.findOne().sort({ order: -1 }).exec();
    let currentMaxOrder = maxOrderQuestion ? maxOrderQuestion.order : 0;

    const results = await Promise.all(
      req.body.map(async (questionData) => {
        const { question, category, parentCategory, answers, correctAnswer, helperImage } =
          questionData;

        if (!question || !category || !parentCategory || !answers || !correctAnswer) {
          console.error('Invalid question data, skipping');
          return null; // Invalid data, skip this object
        }

        // check for optionText
        if (!answers.every((answer) => answer.optionText)) {
          console.error('Invalid question data, skipping');
          console.log('🚀  question:', question);
          return null; // Invalid data, skip this object
        }

        let parsedHelperImage = helperImage;

        if (
          typeof question !== 'string' ||
          typeof category !== 'string' ||
          typeof parentCategory !== 'string' ||
          !Array.isArray(answers) ||
          typeof correctAnswer !== 'string'
        ) {
          console.error('Invalid question data, skipping');
          return null;
        }

        // make sure only one correct answer
        const correctAnswers = answers.filter((answer) => answer.isCorrect);
        if (correctAnswers.length !== 1) {
          console.error('Invalid question data, skipping');
          return null;
        }

        const formattedQuestionData = {
          question,
          category: category.toLowerCase(),
          parentCategory: parentCategory.toLowerCase(),
          answers,
          correctAnswer,
          helperImage: helperImage || null,
          order: ++currentMaxOrder,
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
          console.log('🚀  err:', err);

          throw err; // Re-throw other errors to be caught by outer try-catch
        }
      }),
    );

    // Filter out null values which represent skipped duplicates or invalid data
    const filteredResults = results.filter((result) => result !== null);

    console.log('🚀  done');
    res.status(201).json(filteredResults);
  } catch (err) {
    console.log('🚀  err:', err);
    console.error('createQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = createQuestion;
