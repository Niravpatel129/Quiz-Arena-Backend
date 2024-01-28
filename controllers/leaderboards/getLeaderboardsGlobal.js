const categories = require('../../helpers/categoriesList');
const User = require('../../models/User');

const getLeaderboardsGlobal = async (req, res) => {
  try {
    const allCategories = categories
      .map((category) => {
        return category.subCategories.map((subCategory) => {
          return subCategory.name;
        });
      })
      .flat(1);

    const myAvg = allCategories.map((category) => `$elo.rating.${category.toLowerCase()}`);

    // Fetch top users
    const topUsers = await User.aggregate([
      {
        $project: {
          username: 1,
          profile: 1,
          averageRating: {
            $avg: myAvg,
          },
        },
      },
      { $sort: { averageRating: -1 } },
    ]).limit(30);

    res.json(topUsers);
  } catch (error) {
    res.status(500).send({ message: 'Error calculating average rating' });
  }
};

module.exports = getLeaderboardsGlobal;
