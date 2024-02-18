const RoyalGame = require('../../../models/RoyalGame');
const getRoomId = require('./helpers/getRoomId');
const updateRoomStatus = require('./helpers/updateRoomStatus');

const handleMatchWin = async (socket, io) => {
  socket.on('matchWin', async (data) => {
    try {
      const roomId = await getRoomId();
      console.log('🚀  roomId:', roomId);

      console.log('matchWin', data);

      const winnerUserId = data.winnerUserId;
      const loserUserId = data.loserUserId;

      const game = await RoyalGame.findOne({
        title: roomId,
      });

      if (!game) {
        console.error('Game not found.');
        return;
      }

      game.participants.forEach((participant, index) => {
        const participantId = participant.id.toString();
        if (participantId === winnerUserId) {
          game.participants[index].wins += 1; // Update wins for winner
          game.participants[index].status = 'waiting-next-round'; // Update status for winner
        }

        if (participantId === loserUserId) {
          game.participants[index].status = 'eliminated'; // Update status for loser
        }
      });

      game.markModified('participants');

      await game.save();

      const activeParticipants = game.participants.filter(
        (participant) => participant.status !== 'eliminated',
      );
      if (activeParticipants.length > 1) {
        console.log('Preparing for the next round...');
      } else if (activeParticipants.length === 1) {
        game.status = 'completed';
        game.endTime = new Date();
        await game.save();

        updateRoomStatus(roomId, io);

        // Notify the final winner and all participants about the game completion
        io.to(activeParticipants[0].socketId).emit('tournamentWon', {
          message: "Congratulations! You've won the tournament.",
          game: game,
        });
      }
    } catch (error) {
      console.error('Error handling matchWin:', error);
      // Handle error (e.g., send error message to the client)
    }
  });
};

module.exports = handleMatchWin;
