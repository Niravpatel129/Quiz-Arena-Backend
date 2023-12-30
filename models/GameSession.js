const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  optionText: String,
  isCorrect: Boolean,
});

const roundSchema = new mongoose.Schema({
  questionText: String,
  options: [optionSchema],
  correctAnswer: String,
  helperImage: String,
  timeLimit: Number,
  roundNumber: Number,
});

const gameSessionSchema = new mongoose.Schema({
  category: String,
  players: [
    {
      id: String,
      name: String,
      score: { type: Number, default: 0 },
      socketId: String,
      playerInformation: { type: mongoose.Schema.Types.Mixed },
      answers: [
        {
          roundNumber: Number,
          answer: String,
          isCorrect: Boolean,
          points: Number,
        },
      ],
    },
  ],
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  loserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rounds: [roundSchema],
  currentRound: { type: Number, default: 0 },
  startTime: Date,
  endTime: Date,
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);

module.exports = GameSession;
