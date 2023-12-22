const GameSession = require('../../../models/GameSession');
// Other imports as required

const handlePlayerAnswer = async (sessionId, playerSocketId, answer, io) => {
  const gameSession = await GameSession.findById(sessionId);

  if (!gameSession) {
    console.log('Game session not found.');
    return;
  }

  const currentRound = gameSession.rounds[gameSession.currentRound - 1];

  // Find the player in the session
  const player = gameSession.players.find((p) => p.socketId === playerSocketId);
  console.log('🚀  gameSession.players:', gameSession.players);
  console.log('🚀  playerSocketId:', playerSocketId);

  if (!player) {
    console.log('Player not found in game session.');
    return;
  }

  // Check if the answer is correct
  const isCorrect = answer === currentRound.correctAnswer;

  // Update player's score and answer history
  if (isCorrect) {
    player.score += 5; // Assuming each round has a points value
  }
  player.answers.push({ roundNumber: gameSession.currentRound, answer, isCorrect });

  await gameSession.save();

  // Notify the player about the result
  io.to(playerSocketId).emit('answer_result', { isCorrect, currentScore: player.score });

  // Check if all players have answered to move to the next round or end game
  // This logic depends on your game's rules
};

module.exports = handlePlayerAnswer;
