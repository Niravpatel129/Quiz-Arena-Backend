const { Expo } = require('expo-server-sdk');
let expo = new Expo();

async function sendPushNotifications(tokens, messageBody) {
  let messages = tokens.map((token) => ({
    to: token,
    sound: 'default',
    body: messageBody,
    data: { withSome: 'data' },
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

module.exports = {
  sendPushNotifications,
};
