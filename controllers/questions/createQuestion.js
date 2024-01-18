const QuestionModel = require('../../models/Question');

const convertImageToCloudinaryURL = require('../../helpers/convertImageToCloudinaryURL');

const createQuestion = async (req, res) => {
  try {
    // let userId;

    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Invalid input format. Expected an array.' });
    }

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
          return null; // Invalid data, skip this object
        }

        // if (helperImage) {
        //   console.log('🚀  helperImage:', helperImage);

        //   try {
        //     const response = await convertImageToCloudinaryURL(helperImage);
        //     console.log('🚀  response:', response);
        //     parsedHelperImage = response;
        //   } catch (err) {
        //     console.log('🚀  err:', err);
        //     // throw err;
        //   }
        // }

        const formattedQuestionData = {
          question,
          category: category.toLowerCase(),
          parentCategory: parentCategory.toLowerCase(),
          answers,
          correctAnswer,
          helperImage: helperImage || null,
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
