const startGame = require('../../utils/gameSessionManager/startGame');

const queueStore = {};

const joinQueue = (socket, io) => {
  socket.on('join_queue', (category) => {
    try {
      if (!queueStore[category]) {
        queueStore[category] = new Set();
      }
      queueStore[category].add({
        socketId: socket.id,
        userId: socket.user.user.id,
        name: socket.user.user.name,
      });

      console.log(`🚀  ${socket.id} joined the queue for category:`, category);
      // console.log(`🚀  Current queue for ${category}:`, [...queueStore[category]]);

      io.emit('queue_update', { category, queue: [...queueStore[category]] });

      if (queueStore[category].size === 2) {
        startGame(category, [...queueStore[category]], io);
        queueStore[category].forEach((playerSocketId) => {
          queueStore[category].delete(playerSocketId);
        });
      }

      io.emit('queue_update', { category, queue: [...queueStore[category]] });
    } catch (error) {
      console.log('🚀  error:', error);
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = joinQueue;
