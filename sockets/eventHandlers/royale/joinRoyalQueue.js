const RoyalGame = require('../../../models/RoyalGame');
const startRoyalGame = require('./helpers/startRoyalGame');
const updateRoomStatus = require('./helpers/updateRoomStatus');
const getRoomId = require('./helpers/getRoomId');

const joinRoyalQueue = (socket, io) => {
  socket.on('joinRoyalRoom', async () => {
    const roomId = await getRoomId();

    // wait for the room to be created
    socket.join(roomId);

    updateRoomStatus(roomId, io);
    return;
  });

  socket.on('joinRoyalQueue', async () => {
    try {
      socket.emit('updateQueueStatus', { isInQueue: true });

      const roomId = await getRoomId();

      const userId = socket.user.user.id;
      if (!userId) return console.log('No user id found');

      const room = roomId;

      let game = await RoyalGame.findOne({ title: room }).populate({
        path: 'participants.id',
        select: 'username profile.avatar',
      });

      // if the game is already in progress, then don't allow the user to join
      if (game && (game.status === 'in-progress' || game.status === 'completed')) {
        console.log('Game is already in progress');
        socket.emit('royaleMessage', { message: 'Game is already in progress' });
        return;
      }
      if (!game) {
        // Create and save the new game
        game = new RoyalGame({
          title: room,
          status: 'waiting',
          participants: [{ id: userId, socketId: socket.id }],
        });

        await game.save();

        // Emit message to the socket
        socket.emit('royaleMessage', { message: 'Royale Queue joined!' });

        // Fetch the saved game with the necessary population
        game = await RoyalGame.findById(game._id).populate({
          path: 'participants.id',
          select: 'username profile.avatar',
        });
      }

      const isUserInQueue = game.participants.find((participant) =>
        participant.id._id.equals(userId),
      );
      if (!isUserInQueue) {
        console.log('Adding user to the queue:', userId);

        game.participants.push({ id: userId, socketId: socket.id });

        if (game.participants.length === 4) {
          game.status = 'in-progress';

          await startRoyalGame(game, room, io);
        }
      } else {
        console.log("You're already in the queue.");
        socket.emit('royaleMessage', { message: 'You are already in queue' });
      }

      await game.save();

      socket.emit('joinedRoyalQueue', { room });
      updateRoomStatus(roomId, io);
    } catch (error) {
      console.error('Error joining royal queue:', error);
    }
  });

  socket.on('leaveRoyalQueue', async () => {
    try {
      const userId = socket.user.user.id;

      const game = await RoyalGame.findOne({ 'participants.id': userId, status: 'waiting' });
      if (game) {
        game.participants = game.participants.filter(
          (participant) => !participant.id.equals(userId),
        );
        await game.save();
        socket.emit('updateQueueStatus', { isInQueue: false });

        updateRoomStatus(game.title, io);
      }
    } catch (error) {
      console.error('Error leaving royal queue:', error);
    }
  });
};

module.exports = joinRoyalQueue;
