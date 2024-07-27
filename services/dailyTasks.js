const schedule = require('node-schedule');
const GameSession = require('../models/GameSession');
const Feeder = require('../models/Feeder');
const User = require('../models/User');
const { sendMessageToChannel } = require('../services/discord_bot');
const { EmbedBuilder } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// ======================================
// Chart Creation Function
// ======================================

const createChart = async (data, labels, title, type = 'bar', colors) => {
  const width = 800;
  const height = 400;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const configuration = {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 1,
          fill: type === 'line' ? false : undefined,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              size: 14,
              weight: 'bold',
            },
          },
        },
        title: {
          display: true,
          text: title,
          font: {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 18,
            weight: 'bold',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: {
            font: {
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              size: 12,
            },
          },
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: {
            font: {
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              size: 12,
            },
          },
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeOutBounce',
      },
    },
    plugins: [
      {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },
    ],
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  return image;
};

// ======================================
// Main Task Execution Function
// ======================================

const executeTask = async () => {
  const today = new Date();
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
    today.getDay()
  ];
  console.log(`📅 Executing daily task for ${dayOfWeek}...`, today.toLocaleString());

  try {
    // ----------------------------------------
    // Fetch Statistics
    // ----------------------------------------

    // Game Session Statistics
    const totalGameSessions = await GameSession.countDocuments();
    const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const lastMonthGameSessions = await GameSession.countDocuments({
      startTime: { $gte: oneMonthAgo },
    });
    const todayGameSessions = await GameSession.countDocuments({
      startTime: { $gte: new Date(today.setHours(0, 0, 0, 0)) },
    });
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
    const activeUsersLastMonth = await User.countDocuments({ lastActive: { $gte: oneMonthAgo } });
    const retentionRate = ((activeUsersLastMonth / totalUsers) * 100).toFixed(2);

    // Most Active Category
    const [mostActiveCategory] = await GameSession.aggregate([
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

    // ----------------------------------------
    // Create Charts
    // ----------------------------------------

    const gameSessionChartImage = await createChart(
      [totalGameSessions, lastMonthGameSessions, todayGameSessions, avgGamesPerDay],
      ['Total', 'Last 30 Days', 'Today', 'Avg/Day'],
      'Game Sessions',
      'bar',
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    );

    const userChartImage = await createChart(
      [totalUsers, lastMonthUsers, todayUsers, avgSignupsPerDay],
      ['Total', 'Last 30 Days', 'Today', 'Avg/Day'],
      'Users',
      'line',
      {
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    );

    const feederChartImage = await createChart(
      [totalFeeders, lastMonthFeeders, todayFeeders, avgFeedersPerDay],
      ['Total', 'Last 30 Days', 'Today', 'Avg/Day'],
      'Feeders',
      'polarArea',
      {
        backgroundColor: [
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
      },
    );

    const top10CategoriesChartImage = await createChart(
      top10Categories.map((cat) => cat.count),
      top10Categories.map((cat) => cat._id),
      'Top 10 Categories (Last 30 Days)',
      'doughnut',
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)',
          'rgba(40, 159, 64, 0.8)',
          'rgba(210, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(40, 159, 64, 1)',
          'rgba(210, 99, 132, 1)',
        ],
      },
    );

    // ----------------------------------------
    // Create Embeds
    // ----------------------------------------

    const gameSessionEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`🎮 ${dayOfWeek}'s Daily Task Report - Game Sessions`)
      .setDescription('📊 Game Session Statistics')
      .addFields(
        {
          name: '🔢 Total GameSessions',
          value: `\`${totalGameSessions.toLocaleString()}\``,
          inline: true,
        },
        {
          name: '📅 Games played in the last 30 days',
          value: `\`${lastMonthGameSessions.toLocaleString()}\``,
          inline: true,
        },
        {
          name: '📆 Games played today',
          value: `\`${todayGameSessions.toLocaleString()}\``,
          inline: true,
        },
        {
          name: '📈 Average games per day (last month)',
          value: `\`${avgGamesPerDay.toLocaleString()}\``,
          inline: true,
        },
        {
          name: '🏆 Most Active Category (last month)',
          value: mostActiveCategory
            ? `\`${mostActiveCategory._id}: ${mostActiveCategory.count.toLocaleString()} games\``
            : '`N/A`',
          inline: true,
        },
        {
          name: '📊 Monthly Growth Rate',
          value: `\`${((lastMonthGameSessions / totalGameSessions - 1) * 100).toFixed(2)}%\``,
          inline: true,
        },
      )
      .setImage('attachment://game_sessions_chart.png')
      .setTimestamp()
      .setFooter({ text: 'Game Sessions Report' });

    const userEmbed = new EmbedBuilder()
      .setColor('#9966cc')
      .setTitle(`👥 ${dayOfWeek}'s Daily Task Report - Users`)
      .setDescription('📊 User Statistics')
      .addFields(
        { name: '🔢 Total Users', value: `\`${totalUsers.toLocaleString()}\``, inline: true },
        {
          name: '📅 Signups in the last 30 days',
          value: `\`${lastMonthUsers.toLocaleString()}\``,
          inline: true,
        },
        { name: '📆 Signups today', value: `\`${todayUsers.toLocaleString()}\``, inline: true },
        {
          name: '📈 Average signups per day (last month)',
          value: `\`${avgSignupsPerDay.toLocaleString()}\``,
          inline: true,
        },
        {
          name: '🔄 User Retention Rate (last 30 days)',
          value: `\`${retentionRate}%\``,
          inline: true,
        },
        {
          name: '🏃‍♂️ Active Users (last 30 days)',
          value: `\`${activeUsersLastMonth.toLocaleString()}\``,
          inline: true,
        },
        {
          name: '📊 Monthly Growth Rate',
          value: `\`${((lastMonthUsers / totalUsers - 1) * 100).toFixed(2)}%\``,
          inline: true,
        },
      )
      .setImage('attachment://users_chart.png')
      .setTimestamp()
      .setFooter({ text: 'User Statistics Report' });

    const feederEmbed = new EmbedBuilder()
      .setColor('#ff9900')
      .setTitle(`🍽️ ${dayOfWeek}'s Daily Task Report - Feeders`)
      .setDescription('📊 Feeder Statistics')
      .addFields(
        { name: '🔢 Total Feeders', value: `\`${totalFeeders.toLocaleString()}\``, inline: true },
        {
          name: '📅 Feeders in the last 30 days',
          value: `\`${lastMonthFeeders.toLocaleString()}\``,
          inline: true,
        },
        { name: '📆 Feeders today', value: `\`${todayFeeders.toLocaleString()}\``, inline: true },
        {
          name: '📈 Average feeders per day (last month)',
          value: `\`${avgFeedersPerDay.toLocaleString()}\``,
          inline: true,
        },
        {
          name: '⚖️ Feeder to User Ratio',
          value: `\`${(totalFeeders / totalUsers).toFixed(2)}\``,
          inline: true,
        },
        {
          name: '📊 Monthly Growth Rate',
          value: `\`${((lastMonthFeeders / totalFeeders - 1) * 100).toFixed(2)}%\``,
          inline: true,
        },
      )
      .setImage('attachment://feeders_chart.png')
      .setTimestamp()
      .setFooter({ text: 'Feeder Statistics Report' });

    const top10CategoriesEmbed = new EmbedBuilder()
      .setColor('#4CAF50')
      .setTitle(`🏆 ${dayOfWeek}'s Daily Task Report - Top 10 Categories`)
      .setDescription('📊 Top 10 Categories (Last 30 Days)')
      .addFields(
        top10Categories.map((cat, index) => ({
          name: `${['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][index]} ${cat._id}`,
          value: `\`${cat.count.toLocaleString()} games\``,
          inline: true,
        })),
      )
      .setImage('attachment://top_10_categories_chart.png')
      .setTimestamp()
      .setFooter({ text: 'Top 10 Categories Report' });

    // ----------------------------------------
    // Send Report
    // ----------------------------------------

    console.log('📤 Sending daily task report...');
    await sendMessageToChannel(process.env.DISCORD_DAILY_TASK_CHANNEL_ID, {
      content: `# 📊 ${dayOfWeek}'s Daily Task Report\n\n🕒 Generated on: ${today.toLocaleString()}\n\n---\n\n**Quick Summary:**\n• Total Users: \`${totalUsers.toLocaleString()}\`\n• Total Game Sessions: \`${totalGameSessions.toLocaleString()}\`\n• Total Feeders: \`${totalFeeders.toLocaleString()}\`\n\n---`,
      embeds: [gameSessionEmbed, userEmbed, feederEmbed, top10CategoriesEmbed],
      files: [
        { attachment: gameSessionChartImage, name: 'game_sessions_chart.png' },
        { attachment: userChartImage, name: 'users_chart.png' },
        { attachment: feederChartImage, name: 'feeders_chart.png' },
        { attachment: top10CategoriesChartImage, name: 'top_10_categories_chart.png' },
      ],
    });
  } catch (error) {
    console.error('❌ Error in daily task:', error);
    const errorEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle(`❌ ${dayOfWeek}'s Daily Task Error`)
      .setDescription(
        `An error occurred during the daily task execution:\n\`\`\`${error.message}\`\`\``,
      )
      .setTimestamp();
    await sendMessageToChannel(process.env.DISCORD_DAILY_TASK_CHANNEL_ID, { embeds: [errorEmbed] });
  }
};

// ======================================
// Task Initialization Function
// ======================================

const initializeDailyTasks = () => {
  console.log('🚀 Initializing daily tasks...', new Date().toLocaleString());
  // Execute the task immediately on initialization
  executeTask();

  // Schedule a job to run every day at 1:00 PM
  const job = schedule.scheduleJob('0 13 * * *', executeTask);
  console.log('⏰ Next scheduled run:', job.nextInvocation().toLocaleString());
};

module.exports = { initializeDailyTasks };
