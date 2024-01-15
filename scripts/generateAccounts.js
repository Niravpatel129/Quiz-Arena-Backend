const User = require('../models/User');

const Players = [
  {
    username: '',
    avatar: '',
  },
];

const botList = [];
const generateAccounts = async () => {
  console.log('Generating accounts...');

  for (const player of Players) {
    try {
      const existingUser = await User.findOne({
        username: player.username,
      });

      if (existingUser) {
        botList.push({
          name: player.username,
          userId: existingUser._id,
          socketId: `EWw4E8ELTbxHZx7ZAAABOT${player.username}`,
        });
        continue;
      }

      const newUser = new User({
        email: player.username + '@gmail.com',
        username: player.username,
        password: player.username,
        profile: {
          avatar: player.avatar,
        },
      });

      const createdUser = await newUser.save();

      botList.push({
        name: player.username,
        userId: createdUser._id,
        socketId: `EWw4E8ELTbxHZx7ZAAABOT${player.username}`,
      });
    } catch (err) {
      console.log('Error creating user: ', err);
    }
  }

  console.log('botList:', botList);
};

module.exports = generateAccounts;
