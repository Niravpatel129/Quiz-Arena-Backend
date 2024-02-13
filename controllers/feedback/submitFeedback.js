const Feedback = require('../../models/Feedback');
const { sendMessageToChannel } = require('../../services/discord_bot');

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

    sendMessageToChannel(
      '1206213469146193970',
      `
🚨 Feedback Alert 🚨
New feedback received for question: ${question}
from user: ${userId}
feedback: ${feedback}
`,
    );

    res.json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = submitFeedback;
