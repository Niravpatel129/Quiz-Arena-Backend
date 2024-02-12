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
      status: {
        type: String,
        enum: ['queued', 'in-game', 'eliminated', 'winner'],
        default: 'queued',
      },
      score: { type: Number, default: 0 },
    },
  ],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameSession' }],
  currentMatch: { type: mongoose.Schema.Types.ObjectId, ref: 'GameSession' },
  startTime: Date,
  endTime: Date,
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bracket: { type: mongoose.Schema.Types.Mixed },
});

const RoyalGame = mongoose.model('RoyalGame', royalGameSchema);

module.exports = RoyalGame;
