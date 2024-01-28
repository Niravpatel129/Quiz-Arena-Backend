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
              'https://s3-alpha-sig.figma.com/img/856a/6bb9/3289983fc59a561561abacfa9957a49b?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BcMuKB4UXFXaBG4IZWJQrVmh~obF9hsf~BYBikLrJSgbILYjwJFMhLZMRKbwkoIwl2c1~5LXcdGh~jWnDAEuS9hlwAnWKSt0zH3VUqU6M68Ehrk2dVR215cd8sa5kZbKSTz3w6Wb4IijPAujjM6w2y7ydzH~eXj9o3sQVXeY-HEyr28APihWzNVZBs9nNKQMv-WrvmqgHjmIdB3vhjp9dUuRJbuYKq-R6G~2wkTcS97H4rbN3r3r0pT5OoWFbjhXvtfefZyib3LDTZxWU5XMLJ4BpZbBmuI0VGG8Z9m2YKUSd1MaZfjDDmGGZNkCbgq5WzHMMOJrYhzzdqPr3l6Rlg__',
            date: Date.now(),
          },
          {
            name: 'Beta Tester',
            description: 'You were one of the first to play!',
            image:
              'https://s3-alpha-sig.figma.com/img/4d7c/4a09/8d8ea911a0bb4770f0dab5f9e4519621?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aFg4jRe2DOqGmJZtZIfIwaW1T3CdeVrjDiTWatsQAkvKB7nDaqSzwPfJcjTQReL7-CXfmu6HRoi3oMkLHB66lbZBsMxrv~mxzTDyiYGcekubVimHRDXqWJsHITigbD7l8OmoCofYQ8bP5w2a6Iblioyn27vpk-vvH80jTmvgExy3ovpTdMdkdO~U5AidjNJ2esZ9yLgPVt9pTfM4sFjFbqI0bkAWANT3TjBDPNgWnfWch8Glz4FYOGpkt1ZBSpxGBKnVabFA2ie2vahYMVz5XqLfMJwbrtRmRkRzPCTDfrj8QqatjulYF86usUTaXfZPyd2mAoCBvw1zNCBEGO~xKQ__',
          },
          {
            name: 'Login Streak 1',
            description: 'You logged in for 1 day in a row!',
            image:
              'https://s3-alpha-sig.figma.com/img/d894/4707/346ce8284bd1434fb54a526f1faa0e7e?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W62TGg6xn9ZC0fV0OwhFY5C-5v09cNsepUG7utNq5KXRU7zCAfX09aeS6lrpyBeJfDj47-zPUq4v0XeGnzC5OLgFqUnYT~4pSmbv5iF9JHAqYoThzpVJyADIAqwda~ESrfchnPfybnhZJgvLAcRdb0FbQufwDMSl7jOVLmn6AMIqZU6oiHWxiK6Mk-rPeIX6CHj~s~XT6zlkgLFxY2cBtNeC3XBcbrrdZA8LgKCwSymduzqzPkPtupj0wFigC-ymNEt9HydQvFlEog4f1jMuymlZ0iKuyhH4f~fPXQrjZntpSbCNIia2GHjO3WoXZPvcKM6FfqjVp-1gIfsdaj1WZg__',
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
