const getCurrentQuestion = async (req, res) => {
  try {
    const question = 'How interested would you be in daily trivia tournaments?';
    res.json({ question });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = getCurrentQuestion;
