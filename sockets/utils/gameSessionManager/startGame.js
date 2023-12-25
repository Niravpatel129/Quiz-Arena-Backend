const GameSession = require('../../../models/GameSession');
const User = require('../../../models/User');
const generateRoundsForCategory = require('./generateRounds');
const startRound = require('./startRound');

const startGame = async (category, players, io) => {
  const rounds = await generateRoundsForCategory(category);

  console.log('🚀  startGame triggered');

  const playerPromises = players.map((playerSocketId) =>
    User.findById(playerSocketId.userId)
      .populate('elo')
      .then((player) => ({
        socketId: playerSocketId.socketId,
        id: playerSocketId.userId,
        name: playerSocketId.name,
        playerInformation: {
          elo: {
            ...player.elo.toObject(),
            rating: player.elo.rating[category],
          },
        },
        score: 0,
      })),
  );

  const mappedPlayers = await Promise.all(playerPromises);

  let gameSession = new GameSession({
    category: category,
    players: mappedPlayers,
    rounds: rounds,
    startTime: new Date(),
  });

  await gameSession.save();

  players.forEach((playerSocketId) => {
    io.to(playerSocketId.socketId).emit('game_start', { category });
  });

  // Start the first round
  startRound(gameSession._id, 1, players, io);
};

module.exports = startGame;
