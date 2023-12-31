// sockets/eventHandlers/gameHandlers.js

const joinGame = require('./game/joinGame');
const startGame = require('./game/startGame');
const submitAnswer = require('./game/submitAnswer');
const leaveGame = require('./game/leaveGame');
const checkConnection = require('./game/checkConnection');
const handleBotAnswer = require('./game/handleBotAnswer');

module.exports = (socket, io) => {
  joinGame(socket, io);
  startGame(socket, io);
  submitAnswer(socket, io);
  leaveGame(socket, io);
  checkConnection(socket, io);
  handleBotAnswer(socket, io);
};
