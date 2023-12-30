const Chat = require('../../models/Chat');

const getUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await Chat.find({ participants: userId }).populate(
      'participants messages.sender',
    );
    res.json(chats);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getUserChats;
