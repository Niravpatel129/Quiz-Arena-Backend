const getCurrentQuestion = async (req, res) => {
  try {
    const question = `We're thinking of introducing daily trivia tournaments!`;
    res.json({ question });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = getCurrentQuestion;
