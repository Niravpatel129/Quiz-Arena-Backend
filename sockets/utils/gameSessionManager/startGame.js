const GameSession = require('../../../models/GameSession');
const generateRoundsForCategory = require('./generateRounds');
const startRound = require('./startRound');

const startGame = async (category, players, io) => {
  // console.log(`Game starting for category: ${category} with players:`, players);

  const rounds = await generateRoundsForCategory(category);

  let gameSession = new GameSession({
    category: category,
    players: players.map((playerSocketId) => ({
      playerSocketId: playerSocketId.socketId,
      id: playerSocketId.userId,
      name: playerSocketId.name,
    })),
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
