const categories = require('../../helpers/categoriesList');
const User = require('../../models/User');

const getAverageRatingAcrossAllCategories = async (req, res) => {
  try {
    const allCategories = categories.map((category) => {
      return category.subCategories.map((subCategory) => {
        return subCategory.name;
      });
    });

    const averageRatings = await User.aggregate([
      {
        $project: {
          username: 1,
          profile: 1,
          averageRating: {
            $avg: allCategories.flat(1).map((category) => `$elo.rating.${category.toLowerCase()}`),
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
