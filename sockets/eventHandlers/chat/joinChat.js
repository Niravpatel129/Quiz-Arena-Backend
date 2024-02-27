const joinChat = function (socket) {
  socket.on('join_chat', (chatId) => {
    console.log(`A user joined chat room: ${chatId}`);
    socket.join(chatId);
  });

  socket.on('send_message', ({ chatId, userDetail, message }) => {
    console.log(`Message received in chat ${chatId}: ${message}`);

    socket.to(chatId).emit('chat_message_received', {
      userDetail,
      message,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};

module.exports = joinChat;
