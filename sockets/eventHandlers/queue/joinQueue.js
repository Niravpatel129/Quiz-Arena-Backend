const botList = require('../../../helpers/botList');
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
  socket.on('add_bot', (category) => {
    console.log('🚀  add_bot:', category);
    addBotToQueue(category);

    checkQueueSize(category, io);
  });

  socket.on('join_queue', (category) => {
    console.log(
      `🚀 ${socket.user.user.name} | ${socket.id} joined the queue for category:`,
      category,
    );
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

      checkQueueSize(category, io);
    } catch (error) {
      console.log('🚀  error:', error);
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('leave_queue', () => {
    RemoveFromQueue(socket, io);
  });
};

const addBotToQueue = (category) => {
  const pickARandomBotFromBotList = botList[Math.floor(Math.random() * botList.length)];

  queueStore[category].add({
    socketId: pickARandomBotFromBotList.socketId,
    userId: pickARandomBotFromBotList.userId,
    name: pickARandomBotFromBotList.name,
  });
};

const checkQueueSize = (category, io) => {
  if (queueStore[category].size === 2) {
    startGame(category, [...queueStore[category]], io);
    queueStore[category].forEach((playerSocketId) => {
      queueStore[category].delete(playerSocketId);
    });
  }

  io.emit('queue_update', { category, queue: [...queueStore[category]] });
};

module.exports = {
  joinQueue,
  RemoveFromQueue,
};
