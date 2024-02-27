const RoyalGame = require('../../../../models/RoyalGame');
const updateRoomStatus = require('./updateRoomStatus');
const startGame = require('../../../utils/gameSessionManager/startGame');

const checkAllMatchesCompleted = async ({ prevGame, room, io }) => {
  const game = await RoyalGame.findOne({ title: room }).populate({
    path: 'participants.id',
    select: 'username profile.avatar',
  });

  game.participants.forEach((participant) => {
    if (participant.status !== 'waiting-next-round') {
      participant.status = 'eliminated';
    }
  });

  if (!game.participants.find((participant) => participant.status === 'waiting-next-round')) {
    console.log('Royle Game completed, there is no winner today');
    game.status = 'completed';
    game.endTime = new Date();
    await game.save();
  }

  const activeParticipants = game.participants.filter(
    (participant) => participant.status !== 'eliminated',
  );

  const eliminatedParticipants = game.participants.filter(
    (participant) => participant.status === 'eliminated',
  );

  eliminatedParticipants.forEach((participant) => {
    io.to(participant.socketId).emit('royaleMessage', { message: 'You have been eliminated' });
  });

  activeParticipants.forEach((participant) => {
    io.to(participant.socketId).emit('royaleMessage', {
      message: 'You have qualified for the next round',
    });
  });

  if (activeParticipants.length > 1) {
    console.log('Preparing for the next round...');
    startRoyalGame(game, room, io);
  }

  if (activeParticipants.length === 1) {
    console.log('Royle Game completed, the winner is ', activeParticipants[0].id.username);

    game.status = 'completed';
    game.endTime = new Date();

    game.participants = game.participants.map((participant) => {
      if (participant.id.toString() === activeParticipants[0].id.toString()) {
        participant.status = 'winner';
      }

      return participant;
    });

    await game.save();
  }
};

const startRoyalGame = async (game, room, io) => {
  console.log(`Starting royal game for room: ${room} with players:`, game.participants);

  const activePartcipants = game.participants.filter(
    (participant) => participant.status !== 'eliminated',
  );

  game.status = 'in-progress';
  game.startTime = new Date();

  game.participants.forEach((participant) => {
    // only set the status of the active participants to in-game
    if (activePartcipants.find((p) => p.id.toString() === participant.id.toString())) {
      participant.status = 'in-game';
    }
  });

  await game.save();

  activePartcipants.forEach((participant) => {
    io.to(participant.socketId).emit('royalStart', {
      game: game,
    });
  });

  // Pair participants and notify them
  const pairedParticipants = pairParticipants(activePartcipants);
  notifyParticipantsOfMatches(pairedParticipants, io, room);
  // update nextRoundStartTime to 10 seconds from now
  game.nextRoundStartTime = new Date(new Date().getTime() + 10000);
  setTimeout(() => {
    console.log('Checking for all matches completed');

    checkAllMatchesCompleted({ prevGame: game, room, io });
    updateRoomStatus(room, io);
  }, 100000);
};

// Function to pair participants
function pairParticipants(participants) {
  // Assuming participants is an array of participant objects
  // Simple pairing logic (for illustration, can be improved for actual game logic)
  const pairs = [];
  for (let i = 0; i < participants.length; i += 2) {
    if (participants[i + 1]) {
      pairs.push([participants[i], participants[i + 1]]);

      // make the participants status in-game
    } else {
      // Handle odd number of participants (could give a bye or match with a virtual opponent)
      pairs.push([participants[i]]);
    }
  }
  return pairs;
}

// Function to notify participants of their matches
function notifyParticipantsOfMatches(pairedParticipants, io, room) {
  console.log('🚀  pairedParticipants:', pairedParticipants);
  console.log('Notifying participants of their matches...');

  pairedParticipants.forEach((pair) => {
    startGame(
      'logos',
      [
        {
          socketId: pair[0].socketId,
          userId: pair[0].id._id,
          name: pair[0].id.username || 'Anonymous',
          category: 'logos',
          mode: 'royale',
        },
        {
          socketId: pair[1].socketId,
          userId: pair[1].id._id,
          name: pair[1].id.username || 'Anonymous',
          category: 'logos',
          mode: 'royale',
        },
      ],
      io,
    );
  });

  // pairedParticipants.forEach((pair) => {
  //   const gameChallengeQueueId = uuidv4(); // Generate a unique ID for the match

  //   // pair.forEach((participant) => {
  //   //   io.to(participant.socketId).emit('matchChallenge', {
  //   //     // start a match between the 2 players in the pair

  //   //     opponent: pair.find((p) => p.id !== participant.id), // Send opponent details
  //   //     gameChallengeQueueId: gameChallengeQueueId,
  //   //   });
  //   // });
  // });
}

module.exports = startRoyalGame;
