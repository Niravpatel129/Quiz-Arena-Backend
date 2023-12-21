const GameSession = require('../../../models/GameSession');

const joinSession = async (gameId, playerId) => {
  const session = await GameSession.findOne({ gameId: gameId });
  if (!session) {
    throw new Error('Game session not found');
  }

  if (session.players.includes(playerId)) {
    throw new Error('Player already in session');
  }

  session.players.push(playerId);
  await session.save();
};

const leaveSession = async (gameId, playerId) => {
  const session = await GameSession.findOne({ gameId: gameId });
  if (!session) {
    throw new Error('Game session not found');
  }

  session.players = session.players.filter((p) => p !== playerId);
  await session.save();
};

module.exports = {
  joinSession,
  leaveSession,
};
