const gameSessionManager = require('../../utils/gameSessionManager');

const joinGame = (socket, io) => {
  socket.on('join_game', (gameId) => {
    try {
      const session = gameSessionManager.joinSession(gameId, socket.id);
      socket.join(gameId);
      io.to(gameId).emit('player_joined', { playerId: socket.id, gameId });
    } catch (error) {
      socket.emit('join_error', { message: error.message });
    }
  });
};

module.exports = joinGame;
