const leaveQueue = (socket, io) => {
  socket.on('leave_queue', (category) => {
    try {
      if (queueStore[category]) {
        queueStore[category].delete(socket.id);

        console.log(`🚀  ${socket.id} left the queue for category:`, category);
        console.log(`🚀  Current queue for ${category}:`, [...queueStore[category]]);

        io.emit('queue_update', { category, queue: [...queueStore[category]] });
      }
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = leaveQueue;
