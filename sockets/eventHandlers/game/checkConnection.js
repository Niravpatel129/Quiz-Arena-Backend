const GameSession = require('../../../models/GameSession');

const checkConnection = (socket, io) => {
  socket.on('check_connection', async (gameData) => {
    try {
      const session = await GameSession.findById(gameData.sessionId);
      console.log('🚀  session:', session);

      if (session?.endTime) {
        socket.emit('connection_lost', { message: 'Connection successful' });
      }
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = checkConnection;
