const categories = require('../../helpers/categoriesList2');
const User = require('../../models/User');

const getLeaderboardsFriends = async (req, res) => {
  try {
    const allCategories = categories
      .map((category) => {
        return category.subCategories.map((subCategory) => {
          return subCategory.name;
        });
      })
      .flat(1);

    const myAvg = allCategories.map((category) => `$elo.rating.${category.toLowerCase()}`);

    // Find friends of the requesting user
    const user = await User.findById(req.userId).populate('friends');
    const friendIds = user.friends.map((friend) => friend._id);

    // Include the user's own ID in the friends list
    friendIds.push(user._id);

    // Fetch and rank friends (and the user) based on their average ratings
    const friendsRatings = await User.aggregate([
      {
        $match: {
          _id: { $in: friendIds },
        },
      },
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
    ]);

    res.json(friendsRatings);
  } catch (error) {
    res.status(500).send({ message: 'Error calculating average rating' });
  }
};

module.exports = getLeaderboardsFriends;
