const UserAnswer = require('../../models/UserAnswer');
const mongoose = require('mongoose');

// Function to validate a single userAnswer object
const validateUserAnswer = (answer) => {
  const errors = [];

  if (!answer.question || !mongoose.Types.ObjectId.isValid(answer.question)) {
    errors.push('Invalid or missing "question" field.');
  }

  if (typeof answer.answer !== 'string' || !answer.answer.trim()) {
    errors.push('Invalid or missing "answer" field.');
  }

  if (typeof answer.isCorrect !== 'boolean') {
    errors.push('Invalid or missing "isCorrect" field.');
  }

  return errors;
};

const addUserAnswersBatch = async (req, res) => {
  try {
    const userAnswers = req.body.map((answer) => {
      return {
        ...answer,
        user: req.userId,
      };
    });

    // userAnswers.User = req.userId;

    // console.log('🚀  userAnswers:', userAnswers);

    // Ensure input is an array
    if (!Array.isArray(userAnswers) || userAnswers.length === 0) {
      return res.status(400).send({ message: 'Invalid input: Expected an array of user answers.' });
    }

    // Validate each user answer and collect any validation errors
    const validationErrors = userAnswers.reduce((acc, answer, index) => {
      const errors = validateUserAnswer(answer);
      if (errors.length > 0) {
        acc.push(`Answer at index ${index} has the following errors: ${errors.join(', ')}`);
      }
      return acc;
    }, []);

    // If there are any validation errors, return them
    if (validationErrors.length > 0) {
      return res
        .status(400)
        .send({ message: 'Validation errors in user answers.', errors: validationErrors });
    }

    // Insert validated user answers into the database
    const insertedAnswers = await UserAnswer.insertMany(userAnswers, { ordered: false });

    // Respond with the inserted documents
    res.status(201).json({
      message: 'User answers added successfully.',
      Inserted: insertedAnswers.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = addUserAnswersBatch;
