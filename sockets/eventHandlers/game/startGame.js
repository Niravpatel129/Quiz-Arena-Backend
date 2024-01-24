const gameSessionManager = require('../../utils/gameSessionManager');
const startRound = require('../../utils/gameSessionManager/startRound');

const readyPlayersInSession = {};
const startedSessions = {};

const startGame = (socket, io) => {
  socket.on('ready', (data) => {
    console.log('🚀  ready:', data);
    const { players, gameSessionId } = data;

    if (!gameSessionId) return null;
    if (!players) return null;

    if (startedSessions[gameSessionId]) return null;

    readyPlayersInSession[gameSessionId] = {
      ...readyPlayersInSession[gameSessionId],
      [socket.id]: true,
    };

    if (players?.some((player) => player?.socketId?.includes('BOT'))) {
      startRound(gameSessionId, 1, players, io);
      startedSessions[gameSessionId] = true;
      return;
    }

    if (Object.keys(readyPlayersInSession[gameSessionId]).length === 2) {
      startRound(gameSessionId, 1, players, io);
      startedSessions[gameSessionId] = true;
      return;
    }
  });

  socket.on('start_game', (gameId) => {
    try {
      let session = gameSessionManager.getSession(gameId);
      if (!session) {
        session = gameSessionManager.createSession(gameId);
      }

      if (!session.players.includes(socket.id)) {
        socket.emit('error', { message: 'Player not in game session' });
        return;
      }

      const firstQuestion = gameSessionManager.startGame(gameId);
      session.currentQuestion = firstQuestion;

      io.to(gameId).emit('game_started', { gameId, question: firstQuestion });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};

module.exports = startGame;
