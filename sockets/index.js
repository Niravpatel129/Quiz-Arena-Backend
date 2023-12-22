const socketIO = require('socket.io');
const gameHandlers = require('./eventHandlers/gameHandlers');
const chatHandlers = require('./eventHandlers/chatHandlers');
const authMiddleware = require('./middleware/authMiddleware');

module.exports = (server, config) => {
  const io = socketIO(server, config);

  io.use(authMiddleware);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    gameHandlers(socket, io);
    chatHandlers(socket, io);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
