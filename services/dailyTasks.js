const schedule = require('node-schedule');
const GameSession = require('../models/GameSession');
const { sendMessageToChannel } = require('../services/discord_bot');

const executeTask = async () => {
  console.log('Executing daily task...', new Date());
  try {
    const count = await GameSession.countDocuments();
    const message = `Daily task executed. Total GameSessions: ${count}`;
    console.log(message);
    await sendMessageToChannel(process.env.DISCORD_DAILY_TASK_CHANNEL_ID, message);
  } catch (error) {
    console.error('Error in daily task:', error);
    await sendMessageToChannel(
      process.env.DISCORD_DAILY_TASK_CHANNEL_ID,
      `Error in daily task: ${error.message}`,
    );
  }
};

const initializeDailyTasks = () => {
  console.log('Initializing daily tasks...', new Date());
  // Execute the task immediately on initialization
  executeTask();

  // Schedule a job to run every day at 1:00 PM
  const job = schedule.scheduleJob('0 13 * * *', executeTask);
  console.log('Next scheduled run:', job.nextInvocation());
};

module.exports = { initializeDailyTasks };
