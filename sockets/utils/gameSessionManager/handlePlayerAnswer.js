const GameSession = require('../../../models/GameSession');
const endGame = require('./endGame');
const startRound = require('./startRound');

const baseTime = 10;

const calculateTimeBasedScore = (timeRemaining) => {
  return Math.floor(baseTime - timeRemaining);
};

const handlePlayerAnswer = async (sessionId, playerSocketId, answer, timeRemaining, io) => {
  try {
    let gameSession = await GameSession.findById(sessionId);

    if (!gameSession) {
      console.log('Game session not found.');
      return;
    }

    const currentRound = gameSession.rounds[gameSession.currentRound - 1];
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
    player.answers.push({ roundNumber: gameSession.currentRound, answer, isCorrect, points });

    // Save with error handling for potential version conflicts
    gameSession = await gameSession.save().catch((err) => {
      if (err.name === 'VersionError') {
        console.error('VersionError encountered. Retrying...');
        throw err;
      }
      throw err;
    });

    const allPlayersAnswered = gameSession.players.every((player) =>
      player.answers.some((ans) => ans.roundNumber === gameSession.currentRound),
    );

    if (allPlayersAnswered) {
      if (gameSession.currentRound >= gameSession.rounds.length) {
        await endGame(sessionId, gameSession.players, io);
      } else {
        await startRound(sessionId, gameSession.currentRound + 1, gameSession.players, io);
      }
    }

    io.to(playerSocketId).emit('answer_result', { isCorrect, currentScore: player.score });

    const opponent = gameSession.players.find((p) => p.socketId !== playerSocketId);
    io.to(opponent.socketId).emit('opponent_guessed', { isCorrect, currentScore: opponent.score });
  } catch (error) {
    console.error('Error handling player answer:', error);
  }
};

module.exports = handlePlayerAnswer;
