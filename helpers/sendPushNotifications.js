const { Expo } = require('expo-server-sdk');
const User = require('../models/User');
let expo = new Expo();

async function sendPushNotifications(messageTitle, tokens, messageBody, messageData) {
  let messages = tokens.map((token) => ({
    to: token,
    sound: 'default',
    title: messageTitle || 'New notification',
    body: messageBody,
    data: messageData,
  }));

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
}

// const allMyUsersWithToken = async () => {
//   const users = await User.find({
//     'misc.pushToken': { $exists: true },
//   });

//   const arrayOfTokens = users.map((user) => user.misc.pushToken);
//   // console.log('🚀  arrayOfTokens:', arrayOfTokens);

//   // test only on my token ExponentPushToken[_AnQEVD1jQsDkwQni2IFar]

//   // const arrayOfTokensTest = ['ExponentPushToken[_AnQEVD1jQsDkwQni2IFar]'];

//   sendPushNotifications(
//     'Quiz Arena',
//     arrayOfTokens,
//     'Daily trivia buffs grow their hair 1 inch monthly, Quiz on, grow strong!',
//   );
// };

// allMyUsersWithToken();

module.exports = {
  sendPushNotifications,
};
