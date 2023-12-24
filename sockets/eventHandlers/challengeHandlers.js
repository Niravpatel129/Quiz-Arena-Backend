const { joinChallengeQueue } = require('./challenge/joinChallengeQueue.js');

module.exports = (socket, io) => {
  joinChallengeQueue(socket, io);
};
