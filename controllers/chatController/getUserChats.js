const Chat = require('../../models/Chat');

const getUserChats = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(400).send('userId is required');

    const chats = await Chat.find({ participants: userId }).populate(
      'participants messages.sender',
    );

    console.log('🚀  chats length:', chats.length);

    res.json(chats);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getUserChats;
