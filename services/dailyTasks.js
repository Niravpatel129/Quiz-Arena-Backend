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
  const width = 1600;
  const height = 800;
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

    const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Optimized queries
    const [
      totalGameSessions,
      lastMonthGameSessions,
      todayGameSessions,
      totalUsers,
      lastMonthUsers,
      todayUsers,
      totalFeeders,
      lastMonthFeeders,
      todayFeeders,
      activeUsersLastMonth,
      mostActiveCategory,
      top10Categories,
    ] = await Promise.all([
      GameSession.countDocuments(),
      GameSession.countDocuments({ startTime: { $gte: oneMonthAgo } }),
      GameSession.countDocuments({ startTime: { $gte: new Date(today.setHours(0, 0, 0, 0)) } }),
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      User.countDocuments({ createdAt: { $gte: today } }),
      Feeder.countDocuments(),
      Feeder.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      Feeder.countDocuments({ createdAt: { $gte: today } }),
      User.countDocuments({ lastActive: { $gte: oneMonthAgo } }),
      GameSession.aggregate([
        { $match: { startTime: { $gte: oneMonthAgo } } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ]).then((results) => results[0]),
      GameSession.aggregate([
        { $match: { startTime: { $gte: oneMonthAgo } } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    const avgGamesPerDay = Math.round(lastMonthGameSessions / 30);
    const avgSignupsPerDay = Math.round(lastMonthUsers / 30);
    const avgFeedersPerDay = Math.round(lastMonthFeeders / 30);
    const retentionRate = ((activeUsersLastMonth / totalUsers) * 100).toFixed(2);

    // Fetch historical data for the last 7 days
    const last7DaysData = await Promise.all(
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        return Promise.all([
          GameSession.countDocuments({ startTime: { $gte: startOfDay, $lte: endOfDay } }),
          User.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } }),
          Feeder.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } }),
        ]);
      }),
    );

    // ----------------------------------------
    // Create Charts
    // ----------------------------------------

    const gameSessionChartImage = await createChart(
      last7DaysData.map((day) => day[0]).reverse(),
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      }).reverse(),
      'Game Sessions (Last 7 Days)',
      'line',
      {
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    );

    const userChartImage = await createChart(
      last7DaysData.map((day) => day[1]).reverse(),
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      }).reverse(),
      'New Users (Last 7 Days)',
      'line',
      {
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    );

    const feederChartImage = await createChart(
      last7DaysData.map((day) => day[2]).reverse(),
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      }).reverse(),
      'Feeders (Last 7 Days)',
      'line',
      {
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
    );

    const top10CategoriesChartImage = await createChart(
      top10Categories.map((cat) => cat.count),
      top10Categories.map((cat) => cat._id),
      'Top 10 Categories (Last 30 Days)',
      'bar',
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

  // Schedule a job to run every day at 11:59 PM EST
  const job = schedule.scheduleJob('59 23 * * *', executeTask);
  console.log('⏰ Next scheduled run:', job.nextInvocation().toLocaleString());
};

module.exports = { initializeDailyTasks };
