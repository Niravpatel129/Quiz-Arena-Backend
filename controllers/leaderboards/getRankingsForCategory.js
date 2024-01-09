const User = require('../../models/User');

const getLeaderboardByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const users = await User.find({})
      .sort({ [`elo.rating.${category}`]: -1 })
      .select(`_id username elo.rating.${category}`)
      .limit(10);

    // Transform the query result to the desired format
    const leaderboard = users.map((user) => ({
      userId: user._id,
      username: user.username,
      rating: user.elo.rating[category],
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving leaderboard' });
  }
};

module.exports = getLeaderboardByCategory;
