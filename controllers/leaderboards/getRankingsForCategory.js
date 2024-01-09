const User = require('../../models/User');

const getLeaderboardByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const users = await User.find({})
      .sort({ [`elo.rating.${category}`]: -1 })
      .select(`_id username profile.avatar profile.country elo.rating.${category}`)
      .limit(10);
    console.log('🚀  users:', users);

    // Transform the query result to the desired format
    const leaderboard = users.map((user) => ({
      userId: user._id,
      username: user.username,
      rating: user.elo.rating[category],
      avatar: user.profile.avatar,
      country: user.profile.country,
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving leaderboard' });
  }
};

module.exports = getLeaderboardByCategory;
