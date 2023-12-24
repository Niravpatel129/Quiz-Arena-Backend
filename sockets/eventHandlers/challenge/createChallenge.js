const startGame = require('../../utils/gameSessionManager/startGame');

const challengeStore = {};

// Function to handle the deletion of a challenge
const deleteChallenge = (socket, io) => {
  for (let category in challengeStore) {
    if (challengeStore[category].has(socket.id)) {
      challengeStore[category].delete(socket.id);
      io.emit('challenge_update', { category, queue: [...challengeStore[category]] });
      break;
    }
  }
};

// Function to create a 1v1 challenge
const createChallenge = (socket, io) => {
  socket.on('send_challenge', ({ friendId, category }) => {
    // Notify the friend about the challenge
    io.to(friendId).emit('receive_challenge', { challengerId: socket.id, category });
  });

  socket.on('accept_challenge', ({ challengerId, category }) => {
    try {
      if (!challengeStore[category]) {
        challengeStore[category] = new Set();
      }
      // Add both challenger and friend to the challenge queue
      challengeStore[category].add(socket.id);
      challengeStore[category].add(challengerId);

      io.emit('challenge_update', { category, queue: [...challengeStore[category]] });

      if (challengeStore[category].size === 2) {
        startGame(category, [...challengeStore[category]], io);
        challengeStore[category].clear(); // Clear the challenge queue after starting the game
      }
    } catch (error) {
      console.log('🚀  error:', error);
      socket.emit('error', { message: error.message });
    }
  });

socket.on('decline_challenge', ({ challengerId, category }) => {
    // Notify the challenger that the challenge has been declined
    io.to(challengerId).emit('challenge_declined', { declinerId: socket.id, category });

    // If the challenge was added to the challengeStore, remove it
    if (challengeStore[category]?.has(socket.id)) {
      challengeStore[category].delete(socket.id);
    }

    // Update challenge store and notify users
    if (challengeStore[category]?.has(challengerId)) {
      challengeStore[category].delete(challengerId);
    }
    io.emit('challenge_update', { category, queue: [...(challengeStore[category] || [])] });
  });

  socket.on('leave_challenge', () => {
    deleteChallenge(socket, io);
  });
};


  socket.on('leave_challenge', () => {
    deleteChallenge(socket, io);
  });
};

module.exports = {
  createChallenge,
  deleteChallenge,
};
