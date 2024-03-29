const mongoose = require('mongoose');

const royalGameSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ['waiting', 'in-progress', 'completed'],
    default: 'waiting',
  },
  categories: [String],
  participants: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      socketId: String,
      wins: { type: Number, default: 0 },
      status: {
        type: String,
        default: 'queued',
      },
      score: { type: Number, default: 0 },
    },
  ],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameSession' }],
  currentMatch: { type: mongoose.Schema.Types.ObjectId, ref: 'GameSession' },
  nextRoundStartTime: Date,
  startTime: Date,
  endTime: Date,
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bracket: { type: mongoose.Schema.Types.Mixed },
});

const RoyalGame = mongoose.model('RoyalGame', royalGameSchema);

module.exports = RoyalGame;
