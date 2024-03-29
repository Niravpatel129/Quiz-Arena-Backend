const GameSession = require('../../../models/GameSession');
const endGame = require('./endGame');

const handleTimeUp = async (sessionId, roundNumber, players, io) => {
  const gameSession = await GameSession.findById(sessionId);

  if (!gameSession || gameSession.currentRound !== roundNumber) {
    return;
  }

  // Logic for when both players answered before time up
  // const allPlayersAnswered = gameSession.players.every((player) =>
  //   player.answers.some((ans) => ans.roundNumber === gameSession.currentRound),
  // );

  // if (allPlayersAnswered) {
  //   return;
  // }

  // Logic for handling no answer from player
  gameSession.players.forEach(async (player, index) => {
    if (!player.answers[roundNumber - 1]) {
      console.log(
        player.name,
        'we should add a 0 here for this point for this player and assume he did not answer',
      );

      gameSession.players[index].answers.push({
        roundNumber: gameSession.currentRound,
        answer: 'no answer',
        isCorrect: false,
        points: 0,
      });
    } else {
      console.log(player.name, 'player answered do nothing');
    }
  });

  gameSession.markModified('players');
  await gameSession.save();
  // Increment the round number
  const nextRoundNumber = roundNumber + 1;

  if (nextRoundNumber <= gameSession.rounds.length) {
    startRound(sessionId, nextRoundNumber, players, io);
  } else {
    endGame(sessionId, players, io);
  }
};

const startRound = async (sessionId, roundNumber, players, io) => {
  if (!sessionId) return;

  const gameSession = await GameSession.findById(sessionId);

  // dont start the same round twice
  if (gameSession.currentRound === roundNumber) {
    return;
  }

  if (gameSession.currentRound >= gameSession.rounds.length) {
    // Game over, handle end of game
    endGame(sessionId, players, io); // Implement this function
    return;
  }

  // Set the current round
  gameSession.currentRound = roundNumber;
  await gameSession.save();

  const currentRound = gameSession.rounds[roundNumber - 1];

  players.forEach((playerSocketId) => {
    io.to(playerSocketId.socketId).emit('new_round', {
      gameSession: {
        players: gameSession.players,
        currentRound: gameSession.currentRound,
        startTime: gameSession.startTime,
        category: gameSession.category,
      },
      sessionId,
      roundNumber,
      questionId: currentRound.questionId,
      question: currentRound.questionText,
      questionCorrectAnswerRatio: currentRound.questionCorrectAnswerRatio,
      timeLimit: currentRound.timeLimit,
      options: currentRound.options,
      helperImage: currentRound.helperImage,
      rounds: gameSession.rounds,
    });
  });

  const roundInterval = setInterval(async () => {
    const gameSession = await GameSession.findById(sessionId).populate({
      path: 'players',
      select: '-playerInformation.history',
    });

    const allPlayersAnswered = gameSession.players.every((player) =>
      player.answers.some((ans) => ans.roundNumber === gameSession.currentRound),
    );

    if (allPlayersAnswered) {
      // emit 'round_over' with data from what both players answerd
      players.forEach((playerSocketId) => {
        //
        const player = gameSession.players.find(
          (player) => player.socketId === playerSocketId.socketId,
        );

        const opponent = gameSession.players.find(
          (player) => player.socketId !== playerSocketId.socketId,
        );

        io.to(playerSocketId.socketId).emit('round_over', {
          roundNumber: gameSession.currentRound,
          playerAnswer: gameSession.players.find(
            (player) => player.socketId === playerSocketId.socketId,
          ).answers[gameSession.currentRound - 1],
          playerDetails: { playerInformation: { avatar: player.playerInformation.avatar } },
          opponentAnswer: gameSession.players.find(
            (player) => player.socketId !== playerSocketId.socketId,
          ).answers[gameSession.currentRound - 1],
          opponentDetails: { playerInformation: { avatar: opponent.playerInformation.avatar } },
        });
      });

      clearInterval(roundInterval);
      clearTimeout(timeOut);

      setTimeout(() => {
        handleTimeUp(sessionId, roundNumber, players, io);
      }, 500);

      return;
    }
  }, 500);

  const timeOut = setTimeout(async () => {
    // find session

    clearInterval(roundInterval);
    handleTimeUp(sessionId, roundNumber, players, io);
  }, currentRound.timeLimit * 1000);
};

module.exports = startRound;
