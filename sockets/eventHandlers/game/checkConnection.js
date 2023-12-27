const GameSession = require('../../../models/GameSession');
const gameSessionManager = require('../../utils/gameSessionManager');

const checkConnection = (socket, io) => {
  socket.on('check_connection', async (gameData) => {
    try {
      const session = await GameSession.findById(gameData.gameSession.sessionId);
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
