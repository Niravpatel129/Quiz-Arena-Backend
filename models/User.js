const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eloSchema = require('./Elo');
const generateRandomUsername = require('../helpers/generateRandomUsername');
const categories = require('../helpers/categoriesList');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      default: () => generateRandomUsername(),
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
      default: () => {
        const myRating = {};

        categories.map((category) => {
          return category.subCategories.map((subCategory) => {
            myRating[subCategory.name.toLowerCase()] = 1200;
            return subCategory.name;
          });
        });

        return {
          rating: myRating,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          history: [],
        };
      },
    },
    profile: {
      avatar: {
        type: String,
        default:
          'https://res.cloudinary.com/dwu4qop1o/image/upload/v1705695251/gamercoach/k3ty0buuliiib0aogtgc.jpg',
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
    profileMisc: {
      awards: {
        type: Array,
        default: [
          {
            name: 'First Game',
            description: 'You played your first game!',
            image:
              'https://res.cloudinary.com/dwu4qop1o/image/upload/v1708638053/Style1_1_gjosgx.png',
            date: Date.now(),
          },
          {
            name: 'Beta Tester',
            description: 'You were one of the first to play!',
            image:
              'https://res.cloudinary.com/dwu4qop1o/image/upload/v1708638055/Style2_1_2_vdel0l.png',
          },
          {
            name: 'Login Streak 1',
            description: 'You logged in for 1 day in a row!',
            image:
              'https://res.cloudinary.com/dwu4qop1o/image/upload/v1708638051/Style6_1_2_mz7kvr.png',
          },
        ],
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
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
