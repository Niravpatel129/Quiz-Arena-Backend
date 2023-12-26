const GameSession = require('../../../models/GameSession');

// Pretty sure we arn't using this code
const createSession = async (gameId) => {
  let existingSession = await GameSession.findOne({ gameId: gameId });
  if (existingSession) {
    throw new Error('Game session already exists');
  }

  let newSession = new GameSession({
    category: 'test',
    gameId: gameId,
    players: [],
    currentQuestionIndex: 0,
    questions: [], // TODO: This should be populated by database
    gameStarted: false,
  });

  await newSession.save();
  return newSession;
};

const getSession = async (gameId) => {
  return await GameSession.findOne({ gameId: gameId });
};

module.exports = {
  createSession,
  getSession,
};
