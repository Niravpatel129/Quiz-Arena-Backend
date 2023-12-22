const easyQuestions = [
  {
    questionText: 'Who painted the Mona Lisa?',
    options: [
      { optionText: 'Vincent Van Gogh', isCorrect: false },
      { optionText: 'Pablo Picasso', isCorrect: false },
      { optionText: 'Leonardo da Vinci', isCorrect: true },
      { optionText: 'Michelangelo', isCorrect: false },
    ],
    correctAnswer: 'Leonardo da Vinci',
    helperImage: 'image_url_for_mona_lisa_question',
    timeLimit: 30,
    roundNumber: 1,
  },
  {
    questionText: 'What is the capital of France?',
    options: [
      { optionText: 'Berlin', isCorrect: false },
      { optionText: 'Paris', isCorrect: true },
      { optionText: 'London', isCorrect: false },
      { optionText: 'Rome', isCorrect: false },
    ],
    correctAnswer: 'Paris',
    helperImage: 'image_url_for_paris_question',
    timeLimit: 30,
    roundNumber: 2,
  },
  {
    questionText: 'Which planet is known as the Red Planet?',
    options: [
      { optionText: 'Jupiter', isCorrect: false },
      { optionText: 'Mars', isCorrect: true },
      { optionText: 'Venus', isCorrect: false },
      { optionText: 'Saturn', isCorrect: false },
    ],
    correctAnswer: 'Mars',
    helperImage: 'image_url_for_mars_question',
    timeLimit: 30,
    roundNumber: 3,
  },
  {
    questionText: 'What is the largest mammal in the world?',
    options: [
      { optionText: 'Elephant', isCorrect: false },
      { optionText: 'Blue Whale', isCorrect: true },
      { optionText: 'Giraffe', isCorrect: false },
      { optionText: 'Hippopotamus', isCorrect: false },
    ],
    correctAnswer: 'Blue Whale',
    helperImage: 'image_url_for_blue_whale_question',
    timeLimit: 30,
    roundNumber: 4,
  },
  {
    questionText: 'In which year did the Titanic sink?',
    options: [
      { optionText: '1912', isCorrect: true },
      { optionText: '1905', isCorrect: false },
      { optionText: '1915', isCorrect: false },
      { optionText: '1920', isCorrect: false },
    ],
    correctAnswer: '1912',
    helperImage: 'image_url_for_titanic_question',
    timeLimit: 30,
    roundNumber: 5,
  },
];

module.exports = easyQuestions;
