const handlePlayerAnswer = require('../../utils/gameSessionManager/handlePlayerAnswer');

const submitAnswer = (socket, io) => {
  socket.on('submit_answer', async (data) => {
    try {
      // Extract necessary information from the data
      const { sessionId, answer, timeRemaining } = data;
      const playerSocketId = socket.id;

      // Call the handlePlayerAnswer function
      await handlePlayerAnswer(sessionId, playerSocketId, answer, timeRemaining, io);
    } catch (error) {
      console.error('Error handling submit_answer:', error);
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = submitAnswer;
