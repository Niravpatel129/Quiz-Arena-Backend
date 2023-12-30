const Chat = require('../../models/Chat');

const sendMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messageData = req.body; // Assuming body contains message data
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
