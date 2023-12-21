const gameSessionManager = require('../../utils/gameSessionManager');

const leaveGame = (socket, io) => {
  socket.on('leave_game', (gameId) => {
    try {
      gameSessionManager.leaveSession(gameId, socket.id);
      socket.leave(gameId);
      io.to(gameId).emit('player_left', { playerId: socket.id });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = leaveGame;
