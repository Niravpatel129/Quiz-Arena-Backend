const GameSession = require('../../../models/GameSession');
const User = require('../../../models/User');
const Elo = require('../../../models/Elo');

const updatePlayerRating = async ({ playerId, category, gameResults }) => {
  try {
    const player = await User.findById(playerId);

    if (!player) {
      console.log('Player not found.');
      return;
    }

    let updatedRating = (player.elo.rating[category] += gameResults === 'win' ? 32 : -32);

    if (gameResults === 'draw') {
      updatedRating = player.elo.rating[category] += 10;
    }

    const setCategory = `elo.rating.${category}`;

    await User.findByIdAndUpdate(playerId, {
      $set: {
        [setCategory]: updatedRating,
      },
    });

    console.log('🚀  user, results, new rating:', player.username, gameResults, updatedRating);
  } catch (err) {
    console.log(err);
  }
};

async function endGame(sessionId, players, io) {
  const gameSession = await GameSession.findById(sessionId);

  // Check if the game session is still valid
  if (!gameSession) {
    console.log('Game session not found.');
    return;
  }

  // check if won or lost compared to the other player
  const player1 = gameSession.players[0];
  const player2 = gameSession.players[1];
  const player1Score = player1.score;
  const player2Score = player2.score;

  if (player1Score > player2Score) {
    // player 1 won
    await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'win',
    });
    await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'lost',
    });
  }

  if (player1Score < player2Score) {
    // player 2 won
    await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'win',
    });
    await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'lost',
    });
  }

  if (player1Score === player2Score) {
    // draw
    await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'draw',
    });
    await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'draw',
    });
  }

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
