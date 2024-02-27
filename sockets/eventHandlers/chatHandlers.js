const joinChat = require('./chat/joinChat');

module.exports = (socket, io) => {
  joinChat(socket, io);
};
