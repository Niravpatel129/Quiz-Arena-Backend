const generateRandomUsername = () => {
  let username;

  // Arrays of adjectives and nouns
  const adjectives = ['Red', 'Big', 'Fast', 'Hot', 'Cold', 'Wet', 'Dry', 'Tall'];

  const nouns = ['Cat', 'Dog', 'Fox', 'Bat', 'Rat', 'Owl', 'Pig', 'Cow'];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  // Generate a random number
  const number = Math.floor(Math.random() * 9000);

  // Form the username
  username = `${adjective}${noun}${number}`;

  return username;
};

module.exports = generateRandomUsername;
