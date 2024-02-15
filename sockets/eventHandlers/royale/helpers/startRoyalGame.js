const RoyalGame = require('../../../../models/RoyalGame');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const startRoyalGame = async (game, room, io) => {
  console.log(`Starting royal game for room: ${room} with players:`, game.participants);

  game.status = 'in-progress';
  game.startTime = new Date();

  // game.participants.forEach((participant) => {
  //   participant.status = 'in-game';
  // });

  await game.save();

  game.participants.forEach((participant) => {
    io.to(participant.socketId).emit('royalStart', {
      game: game,
    });
  });

  // Pair participants and notify them
  const pairedParticipants = pairParticipants(game.participants);
  notifyParticipantsOfMatches(pairedParticipants, io, room);

  // Continue with the game logic...
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
  pairedParticipants.forEach((pair) => {
    const gameChallengeQueueId = uuidv4(); // Generate a unique ID for the match
    pair.forEach((participant) => {
      io.to(participant.socketId).emit('matchChallenge', {
        opponent: pair.find((p) => p.id !== participant.id), // Send opponent details
        gameChallengeQueueId: gameChallengeQueueId,
      });
    });
  });
}

module.exports = startRoyalGame;
