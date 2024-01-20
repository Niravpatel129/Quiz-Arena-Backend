const startGame = require('../../utils/gameSessionManager/startGame');

const challengeQueueStore = {};

function joinChallengeQueue(socket, io) {
  socket.on('joinChallengeQueue', (data) => {
    const { gameId, category } = data;

    // delete all empty queues
    Object.keys(challengeQueueStore).forEach((key) => {
      if (challengeQueueStore[key]?.length === 0) {
        delete challengeQueueStore[key];
      }
    });

    // remove user from any other queue they might be in
    Object.keys(challengeQueueStore).forEach((key) => {
      challengeQueueStore[key] = challengeQueueStore[key].filter(
        (item) => item.socketId !== socket.id && item.userId !== socket.user?.user?.id,
      );
    });

    let setCategory = category;

    if (!gameId) {
      console.log('🚀  gameId not found');
      socket.emit('challengeExpired');

      return;
    }

    if (!setCategory) {
      if (!challengeQueueStore[gameId]) {
        socket.emit('challengeExpired');
        return;
      } else {
        console.log('🚀  setting category to', challengeQueueStore[gameId][0].category, gameId);

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
    if (challengeQueueStore[gameId]?.length === 2) {
      // start game with these two players and remove from queue
      console.log('🚀  challengeQueueStore:', challengeQueueStore[gameId]);
      console.log('🚀  category:', setCategory);

      startGame(setCategory, [...challengeQueueStore[gameId]], io);

      delete challengeQueueStore[gameId];
    }
  });

  socket.on('leaveChallengeQueue', (data) => {
    const { gameId } = data;

    if (!gameId) {
      console.log('🚀  gameId not found');
      return;
    }

    if (!challengeQueueStore[gameId]) {
      console.log('🚀  queue not found');
      return;
    }

    challengeQueueStore[gameId] = challengeQueueStore[gameId].filter(
      (item) => item.socketId !== socket.id || item.userId !== socket.user?.user?.id,
    );

    if (challengeQueueStore[gameId]?.length === 0) {
      delete challengeQueueStore[gameId];
      console.log('🚀  queue cleared');
    }
  });
}

module.exports = {
  joinChallengeQueue,
};
