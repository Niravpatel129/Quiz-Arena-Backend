const { sendPushNotifications } = require('../../helpers/sendPushNotifications');
const Chat = require('../../models/Chat');

const sendMessage = async (req, res) => {
  try {
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
    const otherUserId = chat.participants.find((user) => user._id.toString() !== userId.toString());

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
