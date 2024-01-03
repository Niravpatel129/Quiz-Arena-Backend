const { triggerRematch, acceptRematch, declineRematch } = require('./rematch/triggerRematch.js');

module.exports = (socket, io) => {
  triggerRematch(socket, io);
  acceptRematch(socket, io);
  declineRematch(socket, io);
};
