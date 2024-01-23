const gameSessionManager = require('../../utils/gameSessionManager');
const startRound = require('../../utils/gameSessionManager/startRound');

const readyPlayersInSession = {};

const startGame = (socket, io) => {
  socket.on('ready', (data) => {
    return;

    const { players, gameSessionId } = data;

    readyPlayersInSession[gameSessionId] = {
      ...readyPlayersInSession[gameSessionId],
      [socket.id]: true,
    };

    startRound(gameSessionId, 1, players, io);

    if (players.some((player) => player.socketId.includes('BOT'))) {
      startRound(gameSessionId, 1, players, io);
    }

    if (Object.keys(readyPlayersInSession[gameSessionId]).length === 2) {
      startRound(gameSessionId, 1, players, io);
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
