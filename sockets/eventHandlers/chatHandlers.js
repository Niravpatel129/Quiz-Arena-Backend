module.exports = (socket, io) => {
  socket.on('send_message', (data) => {
    const { roomId, message } = data;

    io.in(roomId).emit('receive_message', { senderId: socket.id, message });
  });

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('leave_room', (roomId) => {
    socket.leave(roomId);
  });
};
