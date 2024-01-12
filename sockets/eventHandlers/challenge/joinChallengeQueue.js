const startGame = require('../../utils/gameSessionManager/startGame');

const challengeQueueStore = {};

function joinChallengeQueue(socket, io) {
  socket.on('joinChallengeQueue', (data) => {
    const { gameId, category } = data;
    console.log(
      `🚀  ${socket.id} joined the challenge queue for category ${gameId} gameId:`,
      data.category,
    );

    if (!gameId) {
      console.log('🚀  gameId not found');
      return;
    }

    if (!challengeQueueStore[gameId]) {
      // create new queue
      console.log('🚀  creating new queue');
      challengeQueueStore[gameId] = [
        {
          socketId: socket.id,
          userId: socket.user?.user?.id,
          name: socket.user?.user?.name || 'Anonymous',
          category,
        },
      ];

      // send notification to other user
    } else {
      // add to existing queue
      console.log('🚀  adding to existing queue');
      challengeQueueStore[gameId].push({
        socketId: socket.id,
        userId: socket.user?.user?.id,
        name: socket.user?.user?.name,
        category,
      });
    }

    console.log('🚀  challengeQueueStore:', challengeQueueStore);
    if (challengeQueueStore[gameId].length === 2) {
      // start game with these two players and remove from queue
      console.log('🚀  challengeQueueStore:', challengeQueueStore[gameId]);
      console.log('🚀  category:', category);

      startGame(category, [...challengeQueueStore[gameId]], io);

      delete challengeQueueStore[gameId];
    }
  });
}

module.exports = {
  joinChallengeQueue,
};
