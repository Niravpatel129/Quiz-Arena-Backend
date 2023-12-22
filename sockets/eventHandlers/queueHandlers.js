const joinQueue = require('./queue/joinQueue');
const leaveQueue = require('./queue/leaveQueue');

module.exports = (socket, io) => {
  joinQueue(socket, io);
  leaveQueue(socket, io);
};
