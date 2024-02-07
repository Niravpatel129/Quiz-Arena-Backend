const { sendPushNotifications } = require('../../helpers/sendPushNotifications');
const Chat = require('../../models/Chat');
const { sendMessageToChannel } = require('../../services/discord_bot');
const botList = require('../../helpers/botList');

const sendMessage = async (req, res) => {
  try {
    console.log('🚀 ~ file: sendMessage.js ~ line 8 ~ sendMessage ~ req');
    const userId = req.userId;
    const chatId = req.params.chatId;
    const messageContent = req.body.message;

    const messageData = {
      sender: userId,
      message: messageContent,
      timestamp: new Date(),
      read: false,
    };

    // send push notification to other user
    const chat = await Chat.findById(chatId).populate({
      path: 'participants',
      select: 'misc.pushToken username _id',
    });

    const userInChat = chat.participants.find((user) => user._id.toString() === userId.toString());
    const otherUserId = chat.participants.find((user) => user._id.toString() !== userId.toString());
    console.log('🚀  otherUserId:', otherUserId);

    // if the otherUserId includes 'BOT' then send a message to the discord channel with the message

    if (
      botList.some((bot) => {
        console.log('🚀  bot:', bot);
        console.log('🚀  otherUserId.username:', otherUserId.username);
        if (bot.name === otherUserId.username) return true;
        // otherUserId.username.includes(bot);
      })
    ) {
      console.log('opponent is a bot, sending message to discord channel');
      sendMessageToChannel(
        '1204714714580652092',
        `**${userInChat.username}** send a message to **${otherUserId.username}(BOT)**: 
${messageContent}`,
      );
    }

    if (otherUserId && otherUserId?.misc?.pushToken) {
      sendPushNotifications(
        `${otherUserId.username} send a message`,
        [otherUserId.misc?.pushToken],
        messageContent.slice(0, 100).concat('...'),
        {
          chatId,
        },
      );
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: messageData } },
      { new: true },
    ).populate('messages.sender');

    res.json(updatedChat);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = sendMessage;
