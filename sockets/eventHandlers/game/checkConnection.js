const gameSessionManager = require('../../utils/gameSessionManager');

const checkConnection = (socket, io) => {
  socket.on('check_connection', (gameData) => {
    try {
      console.log('🚀  gameData:', gameData);
      if (gameData.gameSessionManager?.endTime) {
        socket.emit('connection_lost', { message: 'Connection successful' });
      }
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = checkConnection;
