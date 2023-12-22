const joinQueue = (socket, io) => {
  socket.on('join_queue', (category) => {
    try {
      console.log('🚀  category:', category);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = joinQueue;
