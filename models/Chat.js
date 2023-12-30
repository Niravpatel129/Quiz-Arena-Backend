const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      message: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],
  chatType: {
    type: String,
    enum: ['individual', 'group'],
    default: 'individual',
  },
  // Optional: metadata like chat name for group chats, etc.
  chatName: {
    type: String,
    default: '',
  },
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
