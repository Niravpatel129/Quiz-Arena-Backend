const Feedback = require('../../models/Feedback');

// Submit feedback
const submitFeedback = async (req, res) => {
  const userId = req.userId;
  const { question, feedback } = req.body;

  try {
    const newFeedback = new Feedback({
      question,
      response: feedback,
      userId,
    });

    await newFeedback.save();
    res.json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = submitFeedback;
