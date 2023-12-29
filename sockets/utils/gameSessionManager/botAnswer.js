const GameSession = require('../../../models/GameSession');
const endGame = require('./endGame');
const startRound = require('./startRound');

const calculateTimeBasedScore = (timeRemaining) => {
  const baseScore = 20;
  return baseScore - Math.floor(timeRemaining);
};

// Duplicate logic for the bot!
const handlePlayerAnswer = async (sessionId, playerSocketId, answer, timeRemaining, io) => {
  const gameSession = await GameSession.findById(sessionId);

  if (!gameSession) {
    console.log('Game session not found.');
    return;
  }

  const currentRound = gameSession.rounds[gameSession.currentRound - 1];

  // Find the player in the session
  const player = gameSession.players.find((p) => p.socketId === playerSocketId);

  if (!player) {
    console.log('Player not found in game session.');
    return;
  }

  // Check if the answer is correct
  const isCorrect = answer === currentRound.correctAnswer;
  let points = 0;

  // Update player's score and answer history
  if (isCorrect) {
    points = calculateTimeBasedScore(timeRemaining);
    player.score += points; // Assuming each round has a points value
  } else {
    console.log('wrong answer');
  }
  player.answers.push({ roundNumber: gameSession.currentRound, answer, isCorrect, points });

  await gameSession.save();

  const allPlayersAnswered = gameSession.players.every((player) =>
    player.answers.some((ans) => ans.roundNumber === gameSession.currentRound),
  );

  if (allPlayersAnswered) {
    // Move to the next round or end the game
    if (gameSession.currentRound >= gameSession.rounds.length) {
      // End the game
      endGame(sessionId, gameSession.players, io);
    } else {
      // Start the next round
      startRound(sessionId, gameSession.currentRound + 1, gameSession.players, io);
    }
  }

  // Notify the player about the result
  io.to(playerSocketId).emit('answer_result', { isCorrect, currentScore: player.score });

  // emit opponent_guessed to other player
  const opponent = gameSession.players.find((p) => p.socketId !== playerSocketId);
  io.to(opponent.socketId).emit('opponent_guessed', { isCorrect, currentScore: opponent.score });
};

const botAnswer = async (io, botPlayer, gameSession) => {
  try {
    // delay 3 seconds

    const sessionId = gameSession._id;
    const playerSocketId = botPlayer.socketId;
    const answer = gameSession.rounds[gameSession.currentRound - 1].correctAnswer;
    const timeRemaining = '3';

    await handlePlayerAnswer(sessionId, playerSocketId, answer, timeRemaining, io);
  } catch (err) {
    console.log(err);
  }
};

module.exports = botAnswer;
