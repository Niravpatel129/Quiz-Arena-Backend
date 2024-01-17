const startGame = require('../../utils/gameSessionManager/startGame');

const challengeQueueStore = {};

function joinChallengeQueue(socket, io) {
  socket.on('joinChallengeQueue', (data) => {
    const { gameId, category } = data;

    let setCategory = category;

    if (!gameId) {
      console.log('🚀  gameId not found');
      socket.emit('challengeExpired');

      return;
    }

    if (!setCategory) {
      if (!challengeQueueStore[gameId]) {
        socket.emit('challengeExpired');
      } else {
        setCategory = challengeQueueStore[gameId][0].category;
      }
    }

    console.log(
      `🚀  ${socket.id} joined the challenge queue for category ${gameId} gameId:`,
      setCategory,
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
          category: setCategory,
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
        category: setCategory,
      });
    }

    console.log('🚀  challengeQueueStore:', challengeQueueStore);
    if (challengeQueueStore[gameId].length === 2) {
      // start game with these two players and remove from queue
      console.log('🚀  challengeQueueStore:', challengeQueueStore[gameId]);
      console.log('🚀  category:', setCategory);

      startGame(setCategory, [...challengeQueueStore[gameId]], io);

      delete challengeQueueStore[gameId];
    }
  });
}

module.exports = {
  joinChallengeQueue,
};
