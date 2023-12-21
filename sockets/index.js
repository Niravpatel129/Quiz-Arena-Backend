const io = require('socket.io')();
const gameHandlers = require('./eventHandlers/gameHandlers');
const chatHandlers = require('./eventHandlers/chatHandlers.js');
const authMiddleware = require('./middleware/authMiddleware');

module.exports = (server) => {
  io.attach(server);

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
