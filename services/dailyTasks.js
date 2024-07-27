const schedule = require('node-schedule');
const GameSession = require('../models/GameSession');
const { sendMessageToChannel } = require('../services/discord_bot');
const { EmbedBuilder } = require('discord.js');

const executeTask = async () => {
  console.log('Executing daily task...', new Date());
  try {
    const totalCount = await GameSession.countDocuments();

    // Get count of games played in the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const lastWeekCount = await GameSession.countDocuments({ startTime: { $gte: oneWeekAgo } });

    // Get count of games played today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await GameSession.countDocuments({ startTime: { $gte: today } });

    // Calculate the average number of games per day in the last week
    const avgGamesPerDay = Math.round(lastWeekCount / 7);

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Daily Task Report')
      .setDescription('Game Session Statistics')
      .addFields(
        { name: 'Total GameSessions', value: totalCount.toString(), inline: true },
        { name: 'Games played in the last 7 days', value: lastWeekCount.toString(), inline: true },
        { name: 'Games played today', value: todayCount.toString(), inline: true },
        {
          name: 'Average games per day (last week)',
          value: avgGamesPerDay.toString(),
          inline: true,
        },
      )
      .setTimestamp();

    console.log('Sending daily task report...');
    await sendMessageToChannel(process.env.DISCORD_DAILY_TASK_CHANNEL_ID, { embeds: [embed] });
  } catch (error) {
    console.error('Error in daily task:', error);
    const errorEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('Daily Task Error')
      .setDescription(`Error in daily task: ${error.message}`)
      .setTimestamp();
    await sendMessageToChannel(process.env.DISCORD_DAILY_TASK_CHANNEL_ID, { embeds: [errorEmbed] });
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
