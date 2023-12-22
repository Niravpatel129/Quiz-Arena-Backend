const GameSession = require('../../../models/GameSession');
const endGame = require('./endGame');

const handleTimeUp = async (sessionId, roundNumber, players, io) => {
  const gameSession = await GameSession.findById(sessionId);

  if (!gameSession || gameSession.currentRound !== roundNumber) {
    console.log('Game session not found or round number mismatch.');
    return;
  }

  const allPlayersAnswered = gameSession.players.every((player) =>
    player.answers.some((ans) => ans.roundNumber === gameSession.currentRound),
  );

  if (allPlayersAnswered) {
    return;
  }

  const nextRoundNumber = roundNumber + 1;

  if (nextRoundNumber <= gameSession.rounds.length) {
    startRound(sessionId, nextRoundNumber, players, io);
  } else {
    endGame(sessionId, players, io);
  }
};

const startRound = async (sessionId, roundNumber, players, io) => {
  const gameSession = await GameSession.findById(sessionId);

  if (gameSession.currentRound >= gameSession.rounds.length) {
    // Game over, handle end of game
    endGame(sessionId, players, io); // Implement this function
    return;
  }

  // Set the current round
  gameSession.currentRound = roundNumber;
  await gameSession.save();

  const currentRound = gameSession.rounds[roundNumber - 1];

  players.forEach((playerSocketId) => {
    io.to(playerSocketId.socketId).emit('new_round', {
      gameSession: {
        players: gameSession.players,
        currentRound: gameSession.currentRound,
        startTime: gameSession.startTime,
      },
      sessionId,
      roundNumber,
      question: currentRound.questionText,
      timeLimit: currentRound.timeLimit,
      options: currentRound.options,
    });
  });

  // Set a timer for the time limit of the question
  setTimeout(() => {
    handleTimeUp(sessionId, roundNumber, players, io);
  }, currentRound.timeLimit * 1000);
};

module.exports = startRound;
