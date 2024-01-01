const botAnswer = require('../../utils/gameSessionManager/botAnswer');

const handleBotAnswer = (socket, io) => {
  socket.on(
    'bot_answer',
    ({ sessionId, botPlayer, correctAnswer, timeRemaining, currentRound }) => {
      botAnswer(io, botPlayer, sessionId, correctAnswer, timeRemaining, currentRound);
    },
  );
};

module.exports = handleBotAnswer;
