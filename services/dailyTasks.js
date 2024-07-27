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

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const lastMonthGameSessions = await GameSession.countDocuments({
      startTime: { $gte: oneMonthAgo },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayGameSessions = await GameSession.countDocuments({ startTime: { $gte: today } });

    const avgGamesPerDay = Math.round(lastMonthGameSessions / 30);

    // User Statistics
    const totalUsers = await User.countDocuments();

    const lastMonthUsers = await User.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    const todayUsers = await User.countDocuments({ createdAt: { $gte: today } });

    const avgSignupsPerDay = Math.round(lastMonthUsers / 30);

    // Feeder Statistics
    const totalFeeders = await Feeder.countDocuments();

    const lastMonthFeeders = await Feeder.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    const todayFeeders = await Feeder.countDocuments({ createdAt: { $gte: today } });

    const avgFeedersPerDay = Math.round(lastMonthFeeders / 30);

    // User Retention
    const activeUsersLastMonth = await User.countDocuments({
      lastActive: { $gte: oneMonthAgo },
    });
    const retentionRate = ((activeUsersLastMonth / totalUsers) * 100).toFixed(2);

    // Most Active Category
    const mostActiveCategory = await GameSession.aggregate([
      { $match: { startTime: { $gte: oneMonthAgo } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    // Top 10 Categories
    const top10Categories = await GameSession.aggregate([
      { $match: { startTime: { $gte: oneMonthAgo } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Create charts
    const gameSessionChartImage = await createChart(
      [totalGameSessions, lastMonthGameSessions, todayGameSessions, avgGamesPerDay],
      ['Total', 'Last 30 Days', 'Today', 'Avg/Day'],
      'Game Sessions',
    );

    const userChartImage = await createChart(
      [totalUsers, lastMonthUsers, todayUsers, avgSignupsPerDay],
      ['Total', 'Last 30 Days', 'Today', 'Avg/Day'],
      'Users',
    );

    const feederChartImage = await createChart(
      [totalFeeders, lastMonthFeeders, todayFeeders, avgFeedersPerDay],
      ['Total', 'Last 30 Days', 'Today', 'Avg/Day'],
      'Feeders',
    );

    const top10CategoriesChartImage = await createChart(
      top10Categories.map((cat) => cat.count),
      top10Categories.map((cat) => cat._id),
      'Top 10 Categories (Last 30 Days)',
    );

    const gameSessionEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Daily Task Report - Game Sessions')
      .setDescription('Game Session Statistics')
      .addFields(
        { name: 'Total GameSessions', value: totalGameSessions.toString(), inline: true },
        {
          name: 'Games played in the last 30 days',
          value: lastMonthGameSessions.toString(),
          inline: true,
        },
        { name: 'Games played today', value: todayGameSessions.toString(), inline: true },
        {
          name: 'Average games per day (last month)',
          value: avgGamesPerDay.toString(),
          inline: true,
        },
        {
          name: 'Most Active Category (last month)',
          value: mostActiveCategory[0]
            ? `${mostActiveCategory[0]._id}: ${mostActiveCategory[0].count} games`
            : 'N/A',
          inline: true,
        },
        {
          name: 'Monthly Growth Rate',
          value: `${((lastMonthGameSessions / totalGameSessions - 1) * 100).toFixed(2)}%`,
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
        { name: 'Signups in the last 30 days', value: lastMonthUsers.toString(), inline: true },
        { name: 'Signups today', value: todayUsers.toString(), inline: true },
        {
          name: 'Average signups per day (last month)',
          value: avgSignupsPerDay.toString(),
          inline: true,
        },
        {
          name: 'User Retention Rate (last 30 days)',
          value: `${retentionRate}%`,
          inline: true,
        },
        {
          name: 'Active Users (last 30 days)',
          value: activeUsersLastMonth.toString(),
          inline: true,
        },
        {
          name: 'Monthly Growth Rate',
          value: `${((lastMonthUsers / totalUsers - 1) * 100).toFixed(2)}%`,
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
        { name: 'Feeders in the last 30 days', value: lastMonthFeeders.toString(), inline: true },
        { name: 'Feeders today', value: todayFeeders.toString(), inline: true },
        {
          name: 'Average feeders per day (last month)',
          value: avgFeedersPerDay.toString(),
          inline: true,
        },
        {
          name: 'Feeder to User Ratio',
          value: (totalFeeders / totalUsers).toFixed(2),
          inline: true,
        },
        {
          name: 'Monthly Growth Rate',
          value: `${((lastMonthFeeders / totalFeeders - 1) * 100).toFixed(2)}%`,
          inline: true,
        },
      )
      .setImage('attachment://feeders_chart.png')
      .setTimestamp();

    const top10CategoriesEmbed = new EmbedBuilder()
      .setColor('#9932CC')
      .setTitle('Daily Task Report - Top 10 Categories')
      .setDescription('Top 10 Categories (Last 30 Days)')
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
