const Chat = require('../../models/Chat');

const getChatById = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId).populate('participants messages.sender');
    res.json(chat);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getChatById;
