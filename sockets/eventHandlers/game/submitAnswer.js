const handlePlayerAnswer = require('../../utils/gameSessionManager/handlePlayerAnswer');

const submitAnswer = (socket, io) => {
  socket.on('submit_answer', async (data) => {
    try {
      console.log('submit_answer', data);

      // Extract necessary information from the data
      const { sessionId, answer } = data;
      const playerSocketId = socket.id; // Assuming the socket ID represents the player

      // Call the handlePlayerAnswer function
      await handlePlayerAnswer(sessionId, playerSocketId, answer, io);
    } catch (error) {
      console.error('Error handling submit_answer:', error);
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = submitAnswer;
