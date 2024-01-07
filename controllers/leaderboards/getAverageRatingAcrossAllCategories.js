const User = require('../../models/User');

const getAverageRatingAcrossAllCategories = async (req, res) => {
  try {
    const averageRatings = await User.aggregate([
      {
        $project: {
          username: 1,
          profile: 1,
          averageRating: {
            $avg: ['$elo.rating.logos', '$elo.rating.league of legends', '$elo.rating.valorant'],
          },
        },
      },
    ]).limit(30);

    res.json(averageRatings);
  } catch (error) {
    res.status(500).send({ message: 'Error calculating average rating' });
  }
};

module.exports = getAverageRatingAcrossAllCategories;
