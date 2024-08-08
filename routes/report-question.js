const express = require('express');
const router = express.Router();
const QuestionModel = require('../models/Question');
const { sendMessageToChannel } = require('../services/discord_bot');
const UserModel = require('../models/User');

router.post('/', async (req, res) => {
  const questionId = req.body?.id;
  const reportData = req.body?.data;

  if (!questionId) {
    return res.status(400).json({ message: 'Question ID is required' });
  }

  try {
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const user = await UserModel.findById(req.userId);

    question.downvotes = question.downvotes ? question.downvotes + 1 : 1;

    sendMessageToChannel(
      process.env.DISCORD_QUESTION_CHANNEL_ID,
      `
**====================================================================================**

**[Question ${questionId} Report Alert]**

**Question:** ${question.question}  
**Category:** ${question.category}  
**Options:** ${question.answers.map((a) => `${a.optionText} ${a.isCorrect}`).join(', ')}
**Answer:** ${question.correctAnswer}
**Helper Image:** ${question.helperImage ? question.helperImage : 'No Image'}   

**Reported By:** ${user?.username} | ${req?.userId}
**Report Data:** ${JSON.stringify(reportData)}
**cc:** <@277257156632510466>

**====================================================================================**
`,
    );

    await question.save();
    res.status(200).json(question);
  } catch (err) {
    console.error('reportQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
