const mongoose = require('mongoose');
const Chat = require('../../models/Chat');

const createChat = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const existingChat = await Chat.findOne({
      participants: { $all: [mongoose.Types.ObjectId(userId), mongoose.Types.ObjectId(friendId)] },
      chatType: 'individual',
    });

    if (existingChat) {
      return res.json(existingChat);
    } else {
      // Create a new chat
      const newChat = new Chat({
        participants: [userId, friendId],
        chatType: 'individual',
      });
      await newChat.save();
      res.status(201).json(newChat);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = createChat;
