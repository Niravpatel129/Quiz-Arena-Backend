const GameSession = require('../../../models/GameSession');
const User = require('../../../models/User');

const updatePlayerRating = async ({ playerId, category, gameResults }) => {
  try {
    const player = await User.findById(playerId);

    if (!player) {
      console.log('Player not found.');
      return;
    }

    let ratingChange;
    let updatedRating;

    if (gameResults === 'win') {
      ratingChange = 32;
    } else if (gameResults === 'lost') {
      ratingChange = -32;
    } else if (gameResults === 'draw') {
      ratingChange = 10;
    }

    updatedRating = player.elo.rating[category] + ratingChange;
    const setCategory = `elo.rating.${category}`;

    await User.findByIdAndUpdate(playerId, {
      $set: {
        [setCategory]: updatedRating,
      },
    });

    console.log('🚀  user, results, new rating:', player.username, gameResults, updatedRating);
    return ratingChange;
  } catch (err) {
    console.log(err);
    return 0; // Return 0 as the rating change in case of error
  }
};

async function endGame(sessionId, players, io) {
  const gameSession = await GameSession.findById(sessionId);

  if (!gameSession) {
    console.log('Game session not found.');
    return;
  }

  const player1 = gameSession.players[0];
  const player2 = gameSession.players[1];
  const player1Score = player1.score;
  const player2Score = player2.score;

  let player1RatingChange, player2RatingChange;

  if (player1Score > player2Score) {
    player1RatingChange = await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'win',
    });
    player2RatingChange = await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'lost',
    });
  } else if (player1Score < player2Score) {
    player1RatingChange = await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'lost',
    });
    player2RatingChange = await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'win',
    });
  } else {
    // draw
    player1RatingChange = await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'draw',
    });
    player2RatingChange = await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'draw',
    });
  }

  gameSession.endTime = new Date();
  await gameSession.save();
  player1.playerInformation.elo.ratingChange = player1RatingChange;
  player2.playerInformation.elo.ratingChange = player2RatingChange;

  players.forEach((playerSocketId) => {
    io.to(playerSocketId.socketId).emit('game_over', {
      gameSession: gameSession,
    });
  });
}

module.exports = endGame;
