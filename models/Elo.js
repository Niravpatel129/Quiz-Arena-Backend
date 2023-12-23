const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eloSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 1200,
    },
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    draws: {
      type: Number,
      default: 0,
    },
    history: [
      {
        date: Date,
        rating: Number,
        opponentId: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Elo = mongoose.model('Elo', eloSchema);

module.exports = Elo;
