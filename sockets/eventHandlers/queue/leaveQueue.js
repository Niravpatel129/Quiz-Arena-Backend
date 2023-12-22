const leaveQueue = (socket, io) => {
  socket.on('leave_queue', (category) => {
    try {
      console.log('🚀  category:', category);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = leaveQueue;
