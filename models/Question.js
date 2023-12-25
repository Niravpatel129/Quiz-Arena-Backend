const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      optionText: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  helperImage: {
    type: String, // URL or path to the image
    required: false,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
