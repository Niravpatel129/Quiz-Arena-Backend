const socketIO = require('socket.io');
const gameHandlers = require('./eventHandlers/gameHandlers');
const authMiddleware = require('./middleware/authMiddleware');
const queueHandlers = require('./eventHandlers/queueHandlers');

module.exports = (server, config) => {
  const io = socketIO(server, config);

  io.use(authMiddleware);

  io.on('connection', (socket) => {
    socket.emit('connection', null);

    gameHandlers(socket, io);
    queueHandlers(socket, io);

    socket.on('disconnect', () => {});
  });
};
