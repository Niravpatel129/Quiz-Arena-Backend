// user model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eloSchema = require('./Elo');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    notifications: [
      {
        type: { type: String },
        from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: String,
        createdAt: { type: Date, default: Date.now },
        options: { type: mongoose.Schema.Types.Mixed },
      },
    ],
    elo: {
      type: eloSchema,
      default: () => ({
        rating: {
          Logos: 1200,
          'League of Legends': 1200,
          Valorant: 1200,
          'General Knowledge': 1200,
          Friends: 1200,
        },
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        history: [],
      }),
    },
    profile: {
      avatar: {
        type: String,
        default: 'https://storage.googleapis.com/pai-images/04a4d16220a645408362ae47deb07737.jpeg',
      },
      country: {
        type: String,
        default: 'aq',
      },
      experience: {
        type: Number,
        default: 0,
      },
      tag: {
        type: String,
        default: 'Explorer',
      },
    },
    misc: {
      appleId: String,
      facebookId: String,
      googleId: String,
      pushToken: String,
    },

    lastActive: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
