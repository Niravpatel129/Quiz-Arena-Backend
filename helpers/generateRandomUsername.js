const generateRandomUsername = () => {
  let username;
  let isUnique = false;

  // Arrays of adjectives and nouns
  const adjectives = [
    'Dancing',
    'Jumping',
    'Running',
    'Flying',
    'Swimming',
    'Crawling',
    'Walking',
    'Singing',
  ];
  const nouns = [
    'Bear',
    'Lion',
    'Eagle',
    'Shark',
    'Panther',
    'Tiger',
    'Wolf',
    'Horse',
    'Snake',
    'Rabbit',
  ];

  while (!isUnique) {
    // Randomly select an adjective and a noun
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    // Generate a random number
    const number = Math.floor(Math.random() * 100);

    // Form the username
    username = `${adjective}${noun}${number}`;
  }

  return username;
};

module.exports = { generateRandomUsername };
