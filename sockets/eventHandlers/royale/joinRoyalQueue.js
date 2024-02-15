const RoyalGame = require('../../../models/RoyalGame');
const startRoyalGame = require('./helpers/startRoyalGame');
const royalGameData = require('./helpers/royalGameData');

const joinRoyalQueue = (socket, io) => {
  socket.on('joinRoyalRoom', async () => {
    const game = await RoyalGame.findOne({ title: royalGameData.roomId }).populate({
      path: 'participants.id',
      select: 'username',
    });

    socket.emit('roomStatus', {
      players: game.participants.map((player) => {
        return {
          socketId: player.socketId,
          username: player.id.username,
          status: player.status,
        };
      }),
    });
  });

  socket.on('joinRoyalQueue', async () => {
    try {
      const userId = socket.user.user.id;
      if (!userId) return console.log('No user id found');

      const room = getWeeklyRoomName(); // Get the weekly room name

      // Find or create a RoyalGame document for the room with status 'waiting'
      let game = await RoyalGame.findOne({ title: room, status: 'waiting' });
      if (!game) {
        game = new RoyalGame({ title: room, participants: [] });
        await game.save();
      }

      // Check if user is already in the queue
      const isUserInQueue = game.participants.find((participant) => participant.id.equals(userId));
      if (!isUserInQueue) {
        console.log('Adding user to the queue:', userId);

        game.participants.push({ id: userId, socketId: socket.id });

        await game.save();

        io.to(room).emit('updateRoyaleQueue', { queue: game.participants });

        if (game.participants.length === 2) {
          await startRoyalGame(game, room, io);

          game.status = 'in-progress';
          await game.save();
        }
      } else {
        console.log("You're already in the queue.");
        socket.emit('alreadyInQueue', { message: "You're already in the queue." });
      }

      socket.emit('joinedRoyalQueue', { room });
    } catch (error) {
      console.error('Error joining royal queue:', error);
    }
  });
};

module.exports = joinRoyalQueue;
