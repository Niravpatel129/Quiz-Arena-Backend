// Mock function to simulate fetching questions from a database or API
async function fetchQuestionsForCategory(category, numberOfRounds) {
  // Fetch questions based on the category and number of rounds
  // This is a placeholder - you'll need to implement the actual logic
  // depending on your data source (database, external API, etc.)

  const questions = [];

  for (let i = 0; i < numberOfRounds; i++) {
    questions.push({
      questionText: `Question ${i + 1} for ${category}`,
      options: [
        { optionText: 'Option 1', isCorrect: false },
        { optionText: 'Option 2', isCorrect: false },
        { optionText: 'Option 3', isCorrect: true },
        { optionText: 'Option 4', isCorrect: false },
      ],
      correctAnswer: 'Option 3',
      helperImage: `image_url_for_question_${i + 1}`, // URL or path to the image
      timeLimit: 30, // seconds
      roundNumber: i + 1,
    });
  }

  return questions;
}

// Function to generate rounds for a given category
async function generateRoundsForCategory(category) {
  const numberOfRounds = 3; // Define the number of rounds per game
  const rounds = await fetchQuestionsForCategory(category, numberOfRounds);
  return rounds;
}

module.exports = generateRoundsForCategory;
