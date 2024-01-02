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

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: messageData } },
      { new: true },
    ).populate('messages.sender');

    res.json(updatedChat);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = sendMessage;
