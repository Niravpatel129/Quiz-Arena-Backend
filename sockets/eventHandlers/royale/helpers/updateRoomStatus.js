const RoyalGame = require('../../../../models/RoyalGame');

const updateRoomStatus = async (roomId, io) => {
  console.log('Updating room status:', roomId);

  const game = await RoyalGame.findOne({ title: roomId }).populate({
    path: 'participants.id',
    select: 'username profile.avatar',
  });

  if (!game) return console.log('No game found');
  console.log('sending room status to', roomId);
  io.to(roomId).emit('roomStatus', {
    room: roomId,
    roomStatus: game.status,
    players: game.participants.map((player) => {
      return {
        roomMessage: 'Welcome to the game!',
        socketId: player.socketId,
        username: player.id.username,
        userAvatar: player.id.profile.avatar,
        status: player.status,
        wins: player.wins,
      };
    }),
  });
};

module.exports = updateRoomStatus;
