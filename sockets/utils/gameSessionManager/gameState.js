const GameSession = require('../../../models/GameSession');

const startGame = async (gameId) => {
  let session = await GameSession.findOne({ gameId: gameId });
  if (!session) {
    throw new Error('Game session not found');
  }

  // Assuming a function that initializes the game and selects the first question
  session.currentQuestion = initializeGameAndGetFirstQuestion();
  session.gameStarted = true;
  await session.save();

  return session.currentQuestion;
};

const processAnswer = async (gameId, playerId, answer) => {
  const session = await GameSession.findOne({ gameId: gameId });
  if (!session || !session.gameStarted) {
    throw new Error('Game session not found or not started');
  }

  const result = evaluateAnswer(session.currentQuestion, answer);
  // Handle the result of the answer (e.g., updating scores, determining correctness)
  await handleNextStep(session, result);

  return result;
};

const evaluateAnswer = (question, answer) => {
  // Logic to evaluate the player's answer against the current question
  // Return result object containing correctness, score, etc.
};

const handleNextStep = async (session, result) => {
  // Determine the next step in the game based on the current state and the result of the last answer
  if (shouldAdvanceQuestion(session, result)) {
    session.currentQuestion = getNextQuestion(session);
  }

  if (isGameOver(session)) {
    session.gameStarted = false;
    // Additional logic for game over (e.g., declaring winner, saving final scores)
  }

  await session.save();
};

const initializeGameAndGetFirstQuestion = (session) => {
  // Example: Randomly selecting the first question from a set of questions
  const firstQuestionIndex = Math.floor(Math.random() * session.questions.length);
  session.currentQuestionIndex = firstQuestionIndex;
  return session.questions[firstQuestionIndex];
};

const shouldAdvanceQuestion = (session, result) => {
  // Example: Advance to the next question after each answer
  return true;
};

const getNextQuestion = (session) => {
  // Example: Move to the next question in the array
  session.currentQuestionIndex = (session.currentQuestionIndex + 1) % session.questions.length;
  return session.questions[session.currentQuestionIndex];
};

const isGameOver = (session) => {
  // Example: Game over after a fixed number of questions
  const maxQuestions = 10; // Assuming a game ends after 10 questions
  return session.currentQuestionIndex >= maxQuestions;
};

module.exports = {
  startGame,
  processAnswer,
};
