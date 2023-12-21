const gameSessionManager = require('../../utils/gameSessionManager');

const submitAnswer = (socket, io) => {
  socket.on('submit_answer', (data) => {
    const { gameId, answer } = data;
    try {
      const result = gameSessionManager.processAnswer(gameId, socket.id, answer);
      io.to(gameId).emit('answer_result', { playerId: socket.id, answer, result });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = submitAnswer;
