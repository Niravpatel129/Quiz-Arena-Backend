const joinRoyalQueue = require('./royale/joinRoyalQueue');
const handleMatchWin = require('./royale/handleMatchWin');

module.exports = (socket, io) => {
  joinRoyalQueue(socket, io);
  handleMatchWin(socket, io);
};
