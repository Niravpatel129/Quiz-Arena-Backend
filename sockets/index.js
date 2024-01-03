const socketIO = require('socket.io');
const gameHandlers = require('./eventHandlers/gameHandlers');
const authMiddleware = require('./middleware/authMiddleware');
const queueHandlers = require('./eventHandlers/queueHandlers');
const { RemoveFromQueue } = require('./eventHandlers/queue/joinQueue');
const challengeHandlers = require('./eventHandlers/challengeHandlers');
const { updateLastActiveSocket } = require('./middleware/updateLastActive');
const rematchHandlers = require('./eventHandlers/rematchHandlers');

module.exports = (server, config) => {
  const io = socketIO(server, config);

  io.use(authMiddleware);

  io.on('connection', (socket) => {
    socket.emit('connection', null);

    updateLastActiveSocket(socket.user.user.id);

    gameHandlers(socket, io);
    queueHandlers(socket, io);
    challengeHandlers(socket, io);

    rematchHandlers(socket, io);

    socket.on('disconnect', () => {
      console.log(`🚀  ${socket.id} disconnected`);
      RemoveFromQueue(socket, io);
    });
  });
};
