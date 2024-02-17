const RoyalGame = require('../../../models/RoyalGame');
const startRoyalGame = require('./helpers/startRoyalGame');
const royalGameData = require('./helpers/royalGameData');

const joinRoyalQueue = (socket, io) => {
  socket.on('joinRoyalRoom', async () => {
    // connect this socket to the room by the room id

    const game = await RoyalGame.findOne({ title: royalGameData.roomId }).populate({
      path: 'participants.id',
      select: 'username profile.avatar',
    });

    if (!game) return console.log('No game found');

    socket.join(royalGameData.roomId);

    // emit the roomStatus to room

    io.to(royalGameData.roomId).emit('roomStatus', {
      room: royalGameData.roomId,
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
  });

  socket.on('joinRoyalQueue', async () => {
    try {
      const userId = socket.user.user.id;
      if (!userId) return console.log('No user id found');

      const room = royalGameData.roomId;

      let game = await RoyalGame.findOne({ title: room }).populate({
        path: 'participants.id',
        select: 'username',
      });
      console.log('🚀  game:', game);

      // if the game is already in progress, then don't allow the user to join
      if (game && (game.status === 'in-progress' || game.status === 'completed')) {
        console.log('Game is already in progress');
        socket.emit('royaleMessage', { message: 'Game is already in progress' });
        return;
      }

      if (!game) {
        game = new RoyalGame({
          title: room,
          status: 'waiting',
          participants: [{ id: userId, socketId: socket.id }],
        });
        socket.emit('royaleMessage', { message: 'Royale Queue joined!' });

        await game.save();
      }

      // Check if user is already in the queue
      const isUserInQueue = game.participants.find((participant) => participant.id.equals(userId));
      if (!isUserInQueue) {
        console.log('Adding user to the queue:', userId);

        game.participants.push({ id: userId, socketId: socket.id });

        io.to(room).emit('updateRoyaleQueue', { queue: game.participants });

        if (game.participants.length === 4) {
          game.status = 'in-progress';

          await startRoyalGame(game, room, io);
        }
      } else {
        console.log("You're already in the queue.");
        socket.emit('royaleMessage', { message: "You're already in the queue." });
        socket.emit('alreadyInQueue', { message: "You're already in the queue." });
      }

      await game.save();

      socket.emit('joinedRoyalQueue', { room });
    } catch (error) {
      console.error('Error joining royal queue:', error);
    }
  });
};

module.exports = joinRoyalQueue;
