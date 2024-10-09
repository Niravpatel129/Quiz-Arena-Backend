const QuestionModel = require('../../models/Question');
const { sendMessageToChannel } = require('../../services/discord_bot');
const optimizeAndUploadImage = require('../../scripts/uploadToFireStore');

const createQuestion = async (req, res) => {
  try {
    const userId = req.userId;

    console.log('🚀 ~ file: createQuestion.js ~ line 5 ~ createQuestion ~ req.body', req.body);
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

        if (!question || !category || !answers || !correctAnswer) {
          console.error('Invalid question data, skipping');
          // log why its invalid
          if (!question) console.error('question is missing');
          if (!category) console.error('category is missing');
          if (!answers) console.error('answers is missing');
          if (!correctAnswer) console.error('correctAnswer is missing');

          return null; // Invalid data, skip this object
        }

        // check for optionText
        if (!answers.every((answer) => answer.optionText)) {
          console.error('Invalid question data, skipping');
          console.log('🚀  question:', question);
          return null; // Invalid data, skip this object
        }

        let parsedHelperImage = helperImage;
        if (helperImage && !helperImage.includes('googleapis.com')) {
          parsedHelperImage = await optimizeAndUploadImage(helperImage);
        }

        if (
          typeof question !== 'string' ||
          typeof category !== 'string' ||
          typeof parentCategory !== 'string' ||
          !Array.isArray(answers) ||
          typeof correctAnswer !== 'string'
        ) {
          console.error('Invalid question type data, skipping');
          return null;
        }

        // make sure only one correct answer
        const correctAnswers = answers.filter((answer) => answer.isCorrect);
        if (correctAnswers.length === 0) {
          console.error('Invalid question length data, skipping');
          return null;
        }

        const formattedQuestionData = {
          question,
          category: category.toLowerCase(),
          parentCategory: parentCategory.toLowerCase(),
          answers,
          correctAnswer,
          helperImage: parsedHelperImage || null,
          order: ++currentMaxOrder,
          addedBy: userId,
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

    // send a message to the discord channel that this question was created
    sendMessageToChannel(
      '1208878996406669402',
      `
  **📌 New Questions Added 📌**
  ${filteredResults
    .map(
      (question, index) => `
    **Q${index + 1}:** ${question.question}
    *Category:* ${question.category.charAt(0).toUpperCase() + question.category.slice(1)}
    *Parent:* ${question.parentCategory.charAt(0).toUpperCase() + question.parentCategory.slice(1)}
    *Options:*
    ${question.answers
      .map(
        (answer, answerIndex) =>
          `${String.fromCharCode(97 + answerIndex)}) ${answer.optionText}${
            answer.isCorrect ? ' ✅' : ''
          }`,
      )
      .join('\n    ')}
    *Correct Answer:* ${question.correctAnswer}

  `,
    )
    .join('\n\n')}
`,
      {
        split: true,
      },
    );

    res.status(201).json(filteredResults);
  } catch (err) {
    console.log('🚀  err:', err);
    console.error('createQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = createQuestion;
