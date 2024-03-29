const GameSession = require('../../../models/GameSession');
const User = require('../../../models/User');
const generateRoundsForCategory = require('./generateRounds');

const startGame = async (category, players, io, isRematch) => {
  console.log('🚀  starting category:', category);

  const rounds = await generateRoundsForCategory(category);

  const playerPromises = players.map((playerSocketId) =>
    User.findById(playerSocketId.userId)
      .populate('elo')
      .then((player) => {
        if (!player) throw new Error('Player not found');

        return {
          socketId: playerSocketId.socketId,
          id: playerSocketId.userId,
          name: playerSocketId.name,
          category: category,
          playerInformation: {
            elo: {
              ...player?.elo?.toObject(),
              rating: player?.elo?.rating[category] || 1200,
            },
            tag: player.profile.tag,
            experience: player.profile.experience,
            avatar: player.profile.avatar,
            country: player.profile.country,
          },
          score: 0,
        };
      }),
  );

  const mappedPlayers = await Promise.all(playerPromises);

  let gameSession = new GameSession({
    category: category,
    mode: players[0].mode ? players[0].mode : 'default',
    players: mappedPlayers,
    rounds: rounds,
    startTime: new Date(),
  });

  await gameSession.save();

  players.forEach((playerSocketId) => {
    io.to(playerSocketId.socketId).emit('game_start', {
      category,
      gameSessionId: gameSession._id,
      players,
    });
  });

  if (isRematch) {
    players.forEach((player) => {
      io.to(player.socketId).emit('rematchAccepted', {
        gameSessionId: gameSession._id,
        players: players,
      });
    });
  }

  // old logic
  // startRound(gameSession._id, 1, players, io);
};

module.exports = startGame;
