const startRoyalGame = require('./helpers/startRoyalGame');

const royaleQueue = {};

const joinRoyalQueue = (socket, io) => {
  socket.on('joinRoyalQueue', (data) => {
    const { user, room } = data;
    if (!royaleQueue[room]) {
      royaleQueue[room] = [];
    }

    const isUserInQueue = royaleQueue[room].find((u) => u.id === user.id);
    if (!isUserInQueue) {
      royaleQueue[room].push(user);

      io.to(room).emit('updateRoyaleQueue', { queue: royaleQueue[room] });

      if (royaleQueue[room].length === 10) {
        startRoyalGame(royaleQueue[room], room, io);

        royaleQueue[room] = [];
      }
    } else {
      socket.emit('alreadyInQueue', { message: "You're already in the queue." });
    }
  });
};

module.exports = joinRoyalQueue;
