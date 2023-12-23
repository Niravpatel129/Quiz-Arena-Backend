const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  Logos: { type: Number, default: 1200 },
  'League of Legends': { type: Number, default: 1200 },
  Valorant: { type: Number, default: 1200 },
});

const eloSchema = new Schema(
  {
    rating: {
      type: ratingSchema,
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

module.exports = eloSchema;
