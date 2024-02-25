const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: false,
    },
    parentCategory: {
      type: String,
      required: false,
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
      type: String,
      required: false,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    isPending: {
      type: Boolean,
      default: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    stats: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        totalAnswers: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
