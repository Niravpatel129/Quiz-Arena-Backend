const express = require('express');
const router = express.Router();
const QuestionModel = require('../models/Question');
const { sendMessageToChannel } = require('../services/discord_bot');
const UserModel = require('../models/User');

router.post('/', async (req, res) => {
  console.log('Received report question request');
  const questionId = req.body?.id;
  const reportData = req.body?.data;

  console.log(`Question ID: ${questionId}`);
  console.log(`Report Data: ${JSON.stringify(reportData)}`);

  if (!questionId) {
    console.log('Question ID is missing');
    return res.status(400).json({ message: 'Question ID is required' });
  }

  try {
    console.log(`Fetching question with ID: ${questionId}`);
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      console.log(`Question with ID ${questionId} not found`);
      return res.status(404).json({ message: 'Question not found' });
    }

    console.log(`Fetching user with ID: ${req.userId}`);
    const user = await UserModel.findById(req.userId);

    question.downvotes = question.downvotes ? question.downvotes + 1 : 1;
    console.log(`Updated downvotes for question ${questionId}: ${question.downvotes}`);

    const discordMessage = `
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
`;

    console.log('Sending message to Discord channel');
    sendMessageToChannel(process.env.DISCORD_QUESTION_CHANNEL_ID, discordMessage);

    console.log(`Saving updated question ${questionId}`);
    await question.save();
    console.log(`Question ${questionId} successfully updated and reported`);
    res.status(200).json(question);
  } catch (err) {
    console.error('reportQuestion error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
