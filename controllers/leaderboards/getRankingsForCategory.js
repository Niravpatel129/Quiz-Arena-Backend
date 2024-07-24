const User = require('../../models/User');

const getLeaderboardByCategory = async (req, res) => {
  try {
    // Decode URI component to get the category
    const category = decodeURI(req.params.category);
    console.log('🚀  category:', category);

    // Use aggregation framework
    let users = await User.aggregate([
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

    // If no users found or less than 10, get random users
    if (users.length < 10) {
      const randomUsers = await User.aggregate([
        { $sample: { size: 10 - users.length } },
        {
          $project: {
            username: 1,
            'profile.avatar': 1,
            'profile.country': 1,
            rating: `$elo.rating.${category}`,
          },
        },
      ]);
      users = users.concat(randomUsers);
    }

    // Transform the aggregation result to the desired format
    const leaderboard = users.map((user) => ({
      userId: user._id,
      username: user.username,
      rating: user.rating || 0, // Default to 0 if rating is undefined
      avatar: user.profile.avatar,
      country: user.profile.country,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Error retrieving leaderboard:', error);
    res.status(500).send({ message: 'Error retrieving leaderboard' });
  }
};

module.exports = getLeaderboardByCategory;
