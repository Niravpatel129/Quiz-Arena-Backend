const QuestionModel = require('../../models/Question');
const { sendMessageToChannel } = require('../../services/discord_bot');

const downvoteQuestion = async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await QuestionModel.findById(questionId);
    question.downvotes = question.downvotes + 1;

    // send message to discord channel 1201973878121824326, in a nice format that this question was downvoted embded

    sendMessageToChannel(
      process.env.DISCORD_QUESTION_CHANNEL_ID,
      `
**[Question ${questionId} Quallity Alert]**

**Question:** ${question.question}  
**Answer:** ${question.correctAnswer}
**Helper Image:** ${question.helperImage ? question.helperImage : 'No Image'}   

**Down Voted By:** ${req.userId}
**cc:** <@277257156632510466>
`,
    );

    await question.save();
    res.status(200).json(question);
  } catch (err) {
    console.error('upvoteQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = downvoteQuestion;
