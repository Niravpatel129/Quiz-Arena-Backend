const botAnswer = require('../../utils/gameSessionManager/botAnswer');

const handleBotAnswer = (socket, io) => {
  socket.on('bot_answer', ({ sessionId, botPlayer, correctAnswer, timeRemaining }) => {
    botAnswer(io, botPlayer, sessionId, correctAnswer, timeRemaining);
  });
};

module.exports = handleBotAnswer;
