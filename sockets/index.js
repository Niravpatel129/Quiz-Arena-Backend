const socketIO = require('socket.io');
const gameHandlers = require('./eventHandlers/gameHandlers');
const authMiddleware = require('./middleware/authMiddleware');
const queueHandlers = require('./eventHandlers/queueHandlers');
const { RemoveFromQueue } = require('./eventHandlers/queue/joinQueue');
const challengeHandlers = require('./eventHandlers/challengeHandlers');

module.exports = (server, config) => {
  const io = socketIO(server, config);

  io.use(authMiddleware);

  io.on('connection', (socket) => {
    socket.emit('connection', null);

    gameHandlers(socket, io);
    queueHandlers(socket, io);
    challengeHandlers(socket, io);

    socket.on('disconnect', () => {
      console.log(`🚀  ${socket.id} disconnected`);
      RemoveFromQueue(socket, io);
    });
  });
};
