const startGame = (category, players, io) => {
  console.log(`Game starting for category: ${category} with players:`, players);
  players.forEach((playerSocketId) => {
    io.to(playerSocketId).emit('game_start', { category });
  });
};

module.exports = startGame;
