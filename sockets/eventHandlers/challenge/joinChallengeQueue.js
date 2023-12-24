const startGame = require('../../utils/gameSessionManager/startGame');

const challengeQueueStore = {};

function joinChallengeQueue(socket, io) {
  socket.on('joinChallengeQueue', (data) => {
    console.log(`🚀  ${socket.id} joined the challenge queue for category:`, data.category);

    const { gameId, category } = data;

    if (!gameId) {
      console.log('🚀  gameId not found');
      return;
    }

    if (!challengeQueueStore[gameId]) {
      challengeQueueStore[gameId] = [
        {
          socketId: socket.id,
          userId: socket.user.user.id,
          name: socket.user.user.name,
          category,
        },
      ];
    } else {
      challengeQueueStore[gameId].push({
        socketId: socket.id,
        userId: socket.user.user.id,
        name: socket.user.user.name,
        category,
      });
    }

    console.log('🚀  challengeQueueStore:', challengeQueueStore);
    if (challengeQueueStore[gameId].length === 2) {
      startGame(category, [...challengeQueueStore[gameId]], io);

      delete challengeQueueStore[gameId];
    }
  });
}

module.exports = {
  joinChallengeQueue,
};
