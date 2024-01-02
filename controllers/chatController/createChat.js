const mongoose = require('mongoose');
const Chat = require('../../models/Chat');

const chatReturnFormat = (rawChat, myUserId) => {
  console.log('🚀  rawChat:', rawChat);
  const otherParticipant = rawChat.participants.find(
    (participant) => participant._id.toString() !== myUserId,
  );

  return {
    _id: rawChat._id,
    chatingWith: {
      name: otherParticipant.username,
      avatar: otherParticipant.profile.avatar,
      lastActive: otherParticipant.lastActive,
    },
    chatMessages: rawChat.messages.map((message) => {
      return {
        name: message?.sender?.username || 'Unknown',
        message: message.message,
        isSender: message.sender?._id.toString() === myUserId || false,
        sentAgo: message.timestamp,
      };
    }),
    // chatMessages: [
    //   {
    //     name: 'John',
    //     message: 'Hello, how are you?',
    //     isSender: true,
    //     sentAgo: '7 mins ago',
    //   },
    //   {
    //     name: 'LTX Sam',
    //     message: 'I am good, how are you?',
    //     isSender: false,
    //     sentAgo: '6 mins ago',
    //   },
    // ],
  };
};

const createChat = async (req, res) => {
  try {
    const { userId } = req;
    const { friendId } = req.body;

    if (!friendId) return res.status(400).send('friendId is required');

    const existingChat = await Chat.findOne({
      participants: {
        $all: [new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(friendId)],
      },
      chatType: 'individual',
    }).populate('participants messages.sender');

    if (existingChat) {
      return res.json(chatReturnFormat(existingChat, userId));
    } else {
      // Create a new chat
      const newChat = new Chat({
        participants: [userId, friendId],
        chatType: 'individual',
      });

      await newChat.save();

      const populatedNewChat = await Chat.findById(newChat._id).populate(
        'participants messages.sender',
      );
      res.status(201).json(chatReturnFormat(populatedNewChat, userId));
    }
  } catch (error) {
    console.log('🚀  error:', error);
    res.status(500).send(error);
  }
};

module.exports = createChat;
