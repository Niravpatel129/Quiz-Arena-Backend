const mongoose = require('mongoose');
const Chat = require('../../models/Chat');

const chatReturnFormat = (rawChat, myUserId) => {
  console.log('🚀  rawChat:', rawChat);
  const otherParticipant = rawChat.participants.find(
    (participant) => participant._id.toString() !== myUserId,
  );

  return {
    chatingWith: {
      name: otherParticipant.username,
      avatar: otherParticipant.profile.avatar,
      lastActive: otherParticipant.lastActive,
    },
    chatMessages: [
      {
        name: 'John',
        message: 'Hello, how are you?',
        isSender: true,
        sentAgo: '7 mins ago',
      },
      {
        name: 'LTX Sam',
        message: 'I am good, how are you?',
        isSender: false,
        sentAgo: '6 mins ago',
      },
    ],
  };
};

const createChat = async (req, res) => {
  try {
    const { userId } = req;
    const { friendId } = req.body;

    const existingChat = await Chat.findOne({
      participants: {
        $all: [new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(friendId)],
      },
      chatType: 'individual',
    }).populate('participants');

    if (existingChat) {
      return res.json(chatReturnFormat(existingChat, userId));
    } else {
      // Create a new chat
      const newChat = new Chat({
        participants: [userId, friendId],
        chatType: 'individual',
      }).populate('participants');

      await newChat.save();

      res.status(201).json(chatReturnFormat(newChat, userId));
    }
  } catch (error) {
    console.log('🚀  error:', error);
    res.status(500).send(error);
  }
};

module.exports = createChat;
