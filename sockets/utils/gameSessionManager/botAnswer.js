const GameSession = require('../../../models/GameSession');
const endGame = require('./endGame');
const startRound = require('./startRound');

const baseTime = 13;

const calculateTimeBasedScore = (timeRemaining) => {
  return Math.floor(baseTime - timeRemaining);
};

// Duplicate logic for the bot!
// jan 13, 2023 watch this code
const handlePlayerAnswer = async (sessionId, playerSocketId, answer, timeRemaining, io) => {
  try {
    // Fetch the necessary data for the current round
    const gameSessionData = await GameSession.findById(sessionId, 'currentRound rounds players');
    if (!gameSessionData) {
      console.log('Game session not found.');
      return;
    }

    const currentRoundData = gameSessionData.rounds[gameSessionData.currentRound - 1];
    const isCorrect = answer === currentRoundData.correctAnswer;
    let points = isCorrect ? 20 - calculateTimeBasedScore(timeRemaining) : 0;

    const updateCondition = {
      _id: sessionId,
      'players.socketId': playerSocketId,
      'players.answers': { $not: { $elemMatch: { roundNumber: gameSessionData.currentRound } } },
    };

    const updateOperations = {
      $inc: { 'players.$.score': points },
      $push: {
        'players.$.answers': {
          roundNumber: gameSessionData.currentRound,
          answer,
          isCorrect,
          points,
        },
      },
      $set: { lastUpdated: new Date() },
    };

    let updatedGameSession = await GameSession.findOneAndUpdate(updateCondition, updateOperations, {
      new: true,
    });

    // console.log('Bot answered');

    if (!updatedGameSession) {
      return;
    }

    // Check if all players have answered for the current round
    // const allPlayersAnswered = updatedGameSession.players.every((player) =>
    //   player.answers.some((ans) => ans.roundNumber === updatedGameSession.currentRound),
    // );

    // if (allPlayersAnswered) {
    //   if (updatedGameSession.currentRound >= updatedGameSession.rounds.length) {
    //     await endGame(sessionId, updatedGameSession.players, io);
    //   } else {
    //     await startRound(
    //       sessionId,
    //       updatedGameSession.currentRound + 1,
    //       updatedGameSession.players,
    //       io,
    //     );
    //   }
    // }

    io.to(playerSocketId).emit('answer_result', { isCorrect, currentScore: points });

    const opponent = updatedGameSession.players.find((p) => p.socketId !== playerSocketId);
    if (opponent) {
      io.to(opponent.socketId).emit('opponent_guessed', {
        isCorrect,
        currentScore: opponent.score,
      });
    }
  } catch (error) {
    console.error('Error handling player answer:', error);
  }
};

const botAnswer = async (io, botPlayer, sessionId, correctAnswer, timeRemaining, currentRound) => {
  try {
    const playerSocketId = botPlayer.socketId;

    await handlePlayerAnswer(
      sessionId,
      playerSocketId,
      correctAnswer,
      timeRemaining,
      io,
      currentRound,
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = botAnswer;
