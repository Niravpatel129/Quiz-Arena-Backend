// user model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eloSchema = require('./Elo');

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
    },
    elo: {
      type: eloSchema,
      default: () => ({
        rating: { Logos: 1200, 'League of Legends': 1200, Valorant: 1200 },
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        history: [],
      }),
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
