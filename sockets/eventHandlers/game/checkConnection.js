const gameSessionManager = require('../../utils/gameSessionManager');

const startGame = (socket, io) => {
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

module.exports = startGame;
