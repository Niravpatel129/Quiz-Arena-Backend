const gameSessionManager = require('../../utils/gameSessionManager');
const startRound = require('../../utils/gameSessionManager/startRound');

const readyPlayersInSession = {};
const startedSessions = {};
const startTimeouts = {}; // Object to track timeouts

const startGame = (socket, io) => {
  socket.on('ready', (data) => {
    console.log('🚀  ready:', data);
    const { players, gameSessionId } = data;

    if (!gameSessionId || !players || startedSessions[gameSessionId]) return;

    readyPlayersInSession[gameSessionId] = {
      ...readyPlayersInSession[gameSessionId],
      [socket.id]: true,
    };

    const startGameForcefully = () => {
      if (!startedSessions[gameSessionId]) {
        startRound(gameSessionId, 1, players, io);
        startedSessions[gameSessionId] = true;
      }
    };

    if (players?.some((player) => player?.socketId?.includes('BOT'))) {
      startGameForcefully();
      return;
    }

    if (Object.keys(readyPlayersInSession[gameSessionId]).length === 2) {
      startGameForcefully();
      return;
    } else if (!startTimeouts[gameSessionId]) {
      // Set a timeout to start the game forcefully if another ready doesn't come in 2 seconds
      startTimeouts[gameSessionId] = setTimeout(() => {
        startGameForcefully();
        delete startTimeouts[gameSessionId]; // Cleanup timeout ID
      }, 1000);
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
