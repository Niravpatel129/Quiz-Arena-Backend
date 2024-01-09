const User = require('../../models/User');

const getLeaderboardByCategory = async (req, res) => {
  try {
    // Decode URI component to get the category
    const category = decodeURI(req.params.category);

    // Use aggregation framework
    const users = await User.aggregate([
      // Project fields along with a dynamic field for rating
      {
        $project: {
          username: 1,
          'profile.avatar': 1,
          'profile.country': 1,
          rating: `$elo.rating.${category}`,
        },
      },
      // Sort by the dynamic field
      { $sort: { rating: -1 } },
      // Limit to top 10
      { $limit: 10 },
    ]);

    // Transform the aggregation result to the desired format
    const leaderboard = users.map((user) => ({
      userId: user._id,
      username: user.username,
      rating: user.rating,
      avatar: user.profile.avatar,
      country: user.profile.country,
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving leaderboard' });
  }
};

module.exports = getLeaderboardByCategory;
