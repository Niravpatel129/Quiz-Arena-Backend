const joinQueue = require('./queue/joinQueue');

module.exports = (socket, io) => {
  joinQueue(socket, io);
};
