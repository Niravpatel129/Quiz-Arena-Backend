const schedule = require('node-schedule');
const GameSession = require('../models/GameSession');
const Feeder = require('../models/Feeder');
const User = require('../models/User');
const { sendMessageToChannel } = require('../services/discord_bot');
const { EmbedBuilder } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const createChart = async (data, labels, title) => {
  const width = 800;
  const height = 400;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const configuration = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeOutBounce',
      },
    },
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  return image;
};

const executeTask = async () => {
  console.log('Executing daily task...', new Date());
  try {
    // Game Session Statistics
    const totalGameSessions = await GameSession.countDocuments();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const lastWeekGameSessions = await GameSession.countDocuments({
      startTime: { $gte: oneWeekAgo },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayGameSessions = await GameSession.countDocuments({ startTime: { $gte: today } });

    const avgGamesPerDay = Math.round(lastWeekGameSessions / 7);

    // User Statistics
    const totalUsers = await User.countDocuments();

    const lastWeekUsers = await User.countDocuments({ createdAt: { $gte: oneWeekAgo } });

    const todayUsers = await User.countDocuments({ createdAt: { $gte: today } });

    const avgSignupsPerDay = Math.round(lastWeekUsers / 7);

    // Feeder Statistics
    const totalFeeders = await Feeder.countDocuments();

    const lastWeekFeeders = await Feeder.countDocuments({ createdAt: { $gte: oneWeekAgo } });

    const todayFeeders = await Feeder.countDocuments({ createdAt: { $gte: today } });

    const avgFeedersPerDay = Math.round(lastWeekFeeders / 7);

    // User Retention
    const activeUsersLastWeek = await User.countDocuments({
      lastLogin: { $gte: oneWeekAgo },
    });
    const retentionRate = ((activeUsersLastWeek / totalUsers) * 100).toFixed(2);

    // Most Active Category
    const mostActiveCategory = await GameSession.aggregate([
      { $match: { startTime: { $gte: oneWeekAgo } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    // Top 10 Categories
    const top10Categories = await GameSession.aggregate([
      { $match: { startTime: { $gte: oneWeekAgo } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Create charts
    const gameSessionChartImage = await createChart(
      [totalGameSessions, lastWeekGameSessions, todayGameSessions, avgGamesPerDay],
      ['Total', 'Last 7 Days', 'Today', 'Avg/Day'],
      'Game Sessions',
    );

    const userChartImage = await createChart(
      [totalUsers, lastWeekUsers, todayUsers, avgSignupsPerDay],
      ['Total', 'Last 7 Days', 'Today', 'Avg/Day'],
      'Users',
    );

    const feederChartImage = await createChart(
      [totalFeeders, lastWeekFeeders, todayFeeders, avgFeedersPerDay],
      ['Total', 'Last 7 Days', 'Today', 'Avg/Day'],
      'Feeders',
    );

    const top10CategoriesChartImage = await createChart(
      top10Categories.map((cat) => cat.count),
      top10Categories.map((cat) => cat._id),
      'Top 10 Categories (Last 7 Days)',
    );

    const gameSessionEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Daily Task Report - Game Sessions')
      .setDescription('Game Session Statistics')
      .addFields(
        { name: 'Total GameSessions', value: totalGameSessions.toString(), inline: true },
        {
          name: 'Games played in the last 7 days',
          value: lastWeekGameSessions.toString(),
          inline: true,
        },
        { name: 'Games played today', value: todayGameSessions.toString(), inline: true },
        {
          name: 'Average games per day (last week)',
          value: avgGamesPerDay.toString(),
          inline: true,
        },
        {
          name: 'Most Active Category (last week)',
          value: mostActiveCategory[0]
            ? `${mostActiveCategory[0]._id}: ${mostActiveCategory[0].count} games`
            : 'N/A',
          inline: true,
        },
        {
          name: 'Daily Growth Rate',
          value: `${((todayGameSessions / avgGamesPerDay - 1) * 100).toFixed(2)}%`,
          inline: true,
        },
      )
      .setImage('attachment://game_sessions_chart.png')
      .setTimestamp();

    const userEmbed = new EmbedBuilder()
      .setColor('#00ff99')
      .setTitle('Daily Task Report - Users')
      .setDescription('User Statistics')
      .addFields(
        { name: 'Total Users', value: totalUsers.toString(), inline: true },
        { name: 'Signups in the last 7 days', value: lastWeekUsers.toString(), inline: true },
        { name: 'Signups today', value: todayUsers.toString(), inline: true },
        {
          name: 'Average signups per day (last week)',
          value: avgSignupsPerDay.toString(),
          inline: true,
        },
        {
          name: 'User Retention Rate (last 7 days)',
          value: `${retentionRate}%`,
          inline: true,
        },
        {
          name: 'Active Users (last 7 days)',
          value: activeUsersLastWeek.toString(),
          inline: true,
        },
        {
          name: 'User Growth Rate',
          value: `${((todayUsers / avgSignupsPerDay - 1) * 100).toFixed(2)}%`,
          inline: true,
        },
      )
      .setImage('attachment://users_chart.png')
      .setTimestamp();

    const feederEmbed = new EmbedBuilder()
      .setColor('#ff9900')
      .setTitle('Daily Task Report - Feeders')
      .setDescription('Feeder Statistics')
      .addFields(
        { name: 'Total Feeders', value: totalFeeders.toString(), inline: true },
        { name: 'Feeders in the last 7 days', value: lastWeekFeeders.toString(), inline: true },
        { name: 'Feeders today', value: todayFeeders.toString(), inline: true },
        {
          name: 'Average feeders per day (last week)',
          value: avgFeedersPerDay.toString(),
          inline: true,
        },
        {
          name: 'Feeder to User Ratio',
          value: (totalFeeders / totalUsers).toFixed(2),
          inline: true,
        },
        {
          name: 'Feeder Growth Rate',
          value: `${((todayFeeders / avgFeedersPerDay - 1) * 100).toFixed(2)}%`,
          inline: true,
        },
      )
      .setImage('attachment://feeders_chart.png')
      .setTimestamp();

    const top10CategoriesEmbed = new EmbedBuilder()
      .setColor('#9932CC')
      .setTitle('Daily Task Report - Top 10 Categories')
      .setDescription('Top 10 Categories (Last 7 Days)')
      .addFields(
        top10Categories.map((cat, index) => ({
          name: `${index + 1}. ${cat._id}`,
          value: `${cat.count} games`,
          inline: true,
        })),
      )
      .setImage('attachment://top_10_categories_chart.png')
      .setTimestamp();

    console.log('Sending daily task report...');
    await sendMessageToChannel(process.env.DISCORD_DAILY_TASK_CHANNEL_ID, {
      embeds: [gameSessionEmbed, userEmbed, feederEmbed, top10CategoriesEmbed],
      files: [
        { attachment: gameSessionChartImage, name: 'game_sessions_chart.png' },
        { attachment: userChartImage, name: 'users_chart.png' },
        { attachment: feederChartImage, name: 'feeders_chart.png' },
        { attachment: top10CategoriesChartImage, name: 'top_10_categories_chart.png' },
      ],
    });
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
