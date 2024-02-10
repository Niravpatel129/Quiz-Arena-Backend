const GameSession = require('../../../models/GameSession');
const endGame = require('./endGame');
const startRound = require('./startRound');

const baseTime = 13;

const calculateTimeBasedScore = (timeRemaining) => {
  return Math.floor(baseTime - timeRemaining);
};

const handlePlayerAnswer = async (sessionId, playerSocketId, answer, timeRemaining, io) => {
  try {
    let retry = true;
    let gameSession = await GameSession.findById(sessionId, 'currentRound rounds players');

    // check if opponent is bot
    let OpponentBotData = null;
    const isOpponentBot = gameSession.players.find((p) => {
      if (p.socketId.toString().includes('BOT')) {
        OpponentBotData = p;
      }

      return p.socketId.toString().includes('BOT');
    });

    if (isOpponentBot) {
      console.log('Opponent is bot');

      if (OpponentBotData.answers.length >= gameSession.currentRound) {
        console.log('Bot has answered already');
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    while (retry) {
      try {
        // let gameSession = await GameSession.findById(sessionId, 'currentRound rounds players');
        // if (!gameSession) {
        //   console.log('Game session not found.');
        //   return;
        // }

        if (gameSession.players[0].answers.length > gameSession.players[1].answers.length) {
          console.log('Opponent has answered already');
          // return;
        }

        const currentRound = gameSession.rounds[gameSession.currentRound - 1];

        // dont allow answer if already answered for this round using playerSocketId
        const alreadyAnswered = gameSession.players.some((player) =>
          player.answers.some(
            (ans) =>
              ans.roundNumber === gameSession.currentRound && player.socketId === playerSocketId,
          ),
        );

        if (alreadyAnswered) {
          return;
        }

        const player = gameSession.players.find((p) => p.socketId === playerSocketId);

        if (!player) {
          console.log('Player not found in game session.');
          return;
        }

        const isCorrect = answer === currentRound.correctAnswer;
        let points = 0;

        if (isCorrect) {
          points = 20 - calculateTimeBasedScore(timeRemaining);
          player.score += points;
        } else {
          console.log('wrong answer');
        }

        player.answers.push({
          questionId: currentRound.questionId,
          roundNumber: gameSession.currentRound,
          answer,
          isCorrect,
          points,
        });

        const updatedGameSession = await gameSession.save();
        retry = false; // Save successful, no need to retry

        io.to(playerSocketId).emit('answer_result', { isCorrect, currentScore: player.score });

        const opponent = updatedGameSession.players.find((p) => p.socketId !== playerSocketId);
        if (opponent) {
          io.to(opponent.socketId).emit('opponent_guessed', {
            isCorrect,
            currentScore: opponent.score,
          });
        }
      } catch (err) {
        if (err.name === 'VersionError') {
          // console.log('VersionError encountered. Retrying...');
        } else {
          throw err;
        }
      }
    }
  } catch (error) {
    console.error('Error handling player answer:', error);
  }
};

module.exports = handlePlayerAnswer;
