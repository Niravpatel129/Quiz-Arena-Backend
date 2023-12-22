const GameSession = require('../../../models/GameSession');

async function endGame(sessionId, players, io) {
  const gameSession = await GameSession.findById(sessionId);

  // Check if the game session is still valid
  if (!gameSession) {
    console.log('Game session not found.');
    return;
  }

  // Determine the winner (or winners in case of a tie)
  let maxScore = -1;
  let winners = [];
  gameSession.players.forEach((player) => {
    if (player.score > maxScore) {
      maxScore = player.score;
      winners = [player];
    } else if (player.score === maxScore) {
      winners.push(player);
    }
  });

  // Update the game session with the end time and save
  gameSession.endTime = new Date();
  await gameSession.save();

  // Notify players about the end of the game and the winner(s)
  console.log('game_over');
  players.forEach((playerSocketId) => {
    io.to(playerSocketId.socketId).emit('game_over', {
      gameSession: gameSession,
    });
  });
}

module.exports = endGame;
