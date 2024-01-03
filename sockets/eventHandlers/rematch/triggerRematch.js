const startGame = require('../../utils/gameSessionManager/startGame');

// rematch queue
const rematchQueueStore = {};

const triggerRematch = (socket, io) => {
  socket.on('triggerRematch', (data) => {
    const gameId = data.gameId;
    const otherPlayerSocketId = data.otherPlayerSocketId;

    if (!rematchQueueStore[gameId]) {
      rematchQueueStore[gameId] = new Set();

      rematchQueueStore[gameId].add({
        isChallenger: true,
        socketId: socket.id,
        userId: socket.user.user.id,
        name: socket.user.user.name,
      });
    }

    // Send rematch request to other player
    if (rematchQueueStore[gameId].size === 1) {
      io.to(otherPlayerSocketId).emit('rematchRequest', {
        gameId,
        name: socket.user.user.name,
      });
    }
  });
};

const acceptRematch = (socket, io) => {
  socket.on('acceptRematch', (data) => {
    console.log('🚀  acceptRematch:', data);
    const gameId = data.gameId;
    const otherPlayerSocketId = data.otherPlayerSocketId;
    const category = data.category;

    if (rematchQueueStore[gameId]) {
      rematchQueueStore[gameId].add({
        isChallenger: true,
        socketId: socket.id,
        userId: socket.user.user.id,
        name: socket.user.user.name,
      });
    }

    if (rematchQueueStore[gameId].size === 2) {
      // Start a game
      startGame(category, [...rematchQueueStore[gameId]], io);

      return;
    }
  });
};

const declineRematch = (socket, io) => {
  // tell other player that rematch was declined
  socket.on('declineRematch', (data) => {
    console.log('🚀  declineRematch:', data);
    const gameId = data.gameId;
    const otherPlayerSocketId = data.otherPlayerSocketId;

    io.to(otherPlayerSocketId).emit('rematchDeclined', {
      gameId,
      name: socket.user.user.name,
    });
  });
};

module.exports = {
  triggerRematch,
  declineRematch,
  acceptRematch,
};
