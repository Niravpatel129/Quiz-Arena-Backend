const GameSession = require('../../../models/GameSession');
const User = require('../../../models/User');
const questionModel = require('../../../models/Question');
const UserAnswer = require('../../../models/UserAnswer');
const sentGameOver = {};

const updatePlayerRating = async ({ playerId, category, gameResults }) => {
  try {
    const randomNumberBetween = Math.floor(Math.random() * (12 - 5 + 1) + 5);

    console.log('🚀  category:', category);
    const player = await User.findById(playerId);

    if (!player) {
      console.log('Player not found.');
      return;
    }

    let ratingChange;
    let updatedRating;

    if (gameResults === 'win') {
      ratingChange = randomNumberBetween;
    } else if (gameResults === 'lost') {
      ratingChange = -randomNumberBetween;
    } else if (gameResults === 'draw') {
      ratingChange = 0;
    }

    const categoryKey = `elo.rating.${category.toLowerCase()}`;
    updatedRating = (player.elo.rating[category.toLowerCase()] || 1200) + ratingChange;

    const user = await User.findByIdAndUpdate(playerId, {
      $set: {
        [categoryKey]: updatedRating,
      },
      $inc: {
        'elo.gamesPlayed': 1,
        'elo.wins': gameResults === 'win' ? 1 : 0,
        'elo.losses': gameResults === 'lost' ? 1 : 0,
        'elo.draws': gameResults === 'draw' ? 1 : 0,
        'profile.experience': 10,
      },
      $push: {
        'elo.history': {
          category: category,
          ratingChange: ratingChange,
          newRating: updatedRating,
          gameResults: gameResults,
          createdAt: new Date(),
        },
      },
    });

    console.log('🚀  user, results, new rating:', player.username, gameResults, updatedRating);
    return ratingChange;
  } catch (err) {
    console.log(err);
    return 0; // Return 0 as the rating change in case of error
  }
};

const updatePlayerLastActive = async (playerOneId, playerTwoId) => {
  try {
    await User.findByIdAndUpdate(playerOneId, {
      $set: {
        lastActive: new Date(),
      },
    });

    await User.findByIdAndUpdate(playerTwoId, {
      $set: {
        lastActive: new Date(),
      },
    });
  } catch (err) {
    console.log('Error in updatePlayerLastActive:', err);
  }
};

const updateUserAnswer = async ({ questionId, answer, user, isCorrect }) => {
  try {
    if (!questionId) return null;

    const userAnswer = new UserAnswer({
      question: questionId,
      answer: answer,
      user: user,
      isCorrect: isCorrect,
    });

    await userAnswer.save();
  } catch (err) {
    console.log('Error in updateUserAnswer:', err);
  }
};

const updateQuestionsStats = async ({ questions, players }) => {
  players.forEach((player) => {
    if (player.socketId.includes('BOT')) {
      return;
    }

    player.answers.forEach((answer) => {
      updateUserAnswer({
        questionId: answer.questionId,
        answer: answer.answer,
        user: player.id,
        isCorrect: answer.isCorrect,
      });
    });
  });

  try {
    const filteredPlayers = players.filter((player) => !player.socketId.includes('BOT'));
    const rawAnswers = filteredPlayers.map((player) => player.answers);

    const updatePromises = questions.map((question, index) => {
      let totalAnswers = 0;
      let correctAnswers = 0;
      let incorrectAnswers = 0;

      rawAnswers.forEach((playerAnswers) => {
        const answer = playerAnswers.find((ans) => ans.roundNumber === index + 1);
        if (answer) {
          totalAnswers++;
          if (answer.answer === question.correctAnswer) {
            correctAnswers++;
          } else {
            incorrectAnswers++;
          }
        }
      });

      const questionId = question.questionId;
      return questionModel
        .findByIdAndUpdate(questionId, {
          $inc: {
            'stats.totalAnswers': totalAnswers,
            'stats.correctAnswers': correctAnswers,
            'stats.incorrectAnswers': incorrectAnswers,
          },
        })
        .catch((err) => {
          console.error(`Error updating question ${questionId}:`, err);
        });
    });

    await Promise.all(updatePromises);
  } catch (err) {
    console.log('Error in updateQuestionsStats:', err);
  }
};

async function endGame(sessionId, players, io) {
  if (!sessionId) {
    console.log('No session id provided.');
    return;
  }

  if (sentGameOver[sessionId]) {
    console.log(`Game over already sent for session ${sessionId}.`);
    return;
  }

  sentGameOver[sessionId] = true;

  const gameSession = await GameSession.findById(sessionId);

  if (!gameSession) {
    console.log('Game session not found.');
    return;
  }

  const player1 = gameSession.players[0];
  const player2 = gameSession.players[1];
  const player1Score = player1.score;
  const player2Score = player2.score;

  let player1RatingChange, player2RatingChange;
  updatePlayerLastActive(player1.id, player2.id);

  if (player1Score > player2Score) {
    player1RatingChange = await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'win',
    });
    player2RatingChange = await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'lost',
    });
  } else if (player1Score < player2Score) {
    player1RatingChange = await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'lost',
    });
    player2RatingChange = await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'win',
    });
  } else {
    // draw
    player1RatingChange = await updatePlayerRating({
      playerId: player1.id,
      category: gameSession.category,
      gameResults: 'draw',
    });
    player2RatingChange = await updatePlayerRating({
      playerId: player2.id,
      category: gameSession.category,
      gameResults: 'draw',
    });
  }

  gameSession.endTime = new Date();
  gameSession.winnerId = player1Score > player2Score ? player1.id : player2.id;
  gameSession.loserId = player1Score > player2Score ? player2.id : player1.id;

  await gameSession.save();

  players.forEach((playerSocketId) => {
    io.to(playerSocketId.socketId).emit('game_over', {
      gameSession: gameSession,
    });
  });

  updateQuestionsStats({ questions: gameSession.rounds, players: gameSession.players });
}

module.exports = endGame;
