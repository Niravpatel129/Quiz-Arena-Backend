const startGame = require('../../utils/gameSessionManager/startGame');

const queueStore = {};

const RemoveFromQueue = (socket, io) => {
  let foundCategory = null;

  for (let category in queueStore) {
    for (let player of queueStore[category]) {
      if (player.socketId === socket.id) {
        foundCategory = category;
        break;
      }
    }
    if (foundCategory) break;
  }

  if (foundCategory) {
    // Remove the player from the set
    queueStore[foundCategory] = new Set(
      [...queueStore[foundCategory]].filter((player) => player.socketId !== socket.id),
    );

    io.emit('queue_update', { category: foundCategory, queue: [...queueStore[foundCategory]] });
  }
};

const joinQueue = (socket, io) => {
  socket.on('join_queue', (category) => {
    console.log(`🚀  ${socket.id} joined the queue for category:`, category);
    try {
      if (!queueStore[category]) {
        queueStore[category] = new Set();
      }
      queueStore[category].add({
        socketId: socket.id,
        userId: socket.user.user.id,
        name: socket.user.user.name,
      });

      console.log('🚀  socket.id:', socket.id);
      console.log('🚀  socket.user.user.name:', socket.user.user.name);
      console.log('🚀  socket.user.user.id:', socket.user.user.id);

      if (socket.user.user.name === 'admin') {
        queueStore[category].add({
          socketId: 'EWw4E8ELTbxHZx7ZAAAD',
          userId: '6589b52604a85f1cec06f556',
          name: 'zezima',
        });
      }

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

  socket.on('leave_queue', () => {
    RemoveFromQueue(socket, io);
  });
};

module.exports = {
  joinQueue,
  RemoveFromQueue,
};
