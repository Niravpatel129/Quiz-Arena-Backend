const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  gameId: String,
  players: [String],
  currentQuestion: Number,
  questions: [String],
  gameStarted: Boolean,
});

module.exports = mongoose.model('GameSession', gameSessionSchema);
