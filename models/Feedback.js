const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
