const RoyalGame = require('../../../../models/RoyalGame');

const startRoyalGame = async (players, room, io) => {
  console.log(`Starting royal game for room: ${room} with players:`, players);

  const royalGame = new RoyalGame({
    status: 'in-progress',
    participants: players.map((player) => ({
      id: player.id,
      socketId: player.socketId,
      status: 'in-game',
    })),
    startTime: new Date(),
  });

  io.to(room).emit('royal_game_start', {
    gameSessionId: royalGame._id,
    players,
  });

  await royalGame.save();
};

module.exports = startRoyalGame;
