const User = require('../../models/User');

const getAverageRatingAcrossAllCategories = async (req, res) => {
  try {
    const averageRatings = await User.aggregate([
      {
        $project: {
          username: 1,
          averageRating: {
            $avg: ['$elo.rating.Logos', '$elo.rating.League of Legends', '$elo.rating.Valorant'],
          },
        },
      },
    ]).limit(100);

    res.json(averageRatings);
  } catch (error) {
    res.status(500).send({ message: 'Error calculating average rating' });
  }
};

module.exports = getAverageRatingAcrossAllCategories;
