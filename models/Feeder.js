const mongoose = require('mongoose');

const feederSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scoreAchieved: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Feeder = mongoose.model('Feeder', feederSchema);

module.exports = Feeder;
