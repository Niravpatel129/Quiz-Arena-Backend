const QuestionModel = require('../../models/Question');
const { sendMessageToChannel } = require('../../services/discord_bot');
const UserModel = require('../../models/User');

const downvoteQuestion = async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await QuestionModel.findById(questionId);
    const user = await UserModel.findById(req.userId);
    question.downvotes = question.downvotes + 1;

    sendMessageToChannel(
      process.env.DISCORD_QUESTION_CHANNEL_ID,
      `
**[Question ${questionId} Quallity Alert]**

**Question:** ${question.question}  
**Category:** ${question.category}  
**Answer:** ${question.correctAnswer}
**Helper Image:** ${question.helperImage ? question.helperImage : 'No Image'}   

**Down Voted By:** ${user.username} | ${req.userId}
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
