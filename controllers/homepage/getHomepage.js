const categories = require('../../helpers/categoriesList');
const User = require('../../models/User');

const getHomepage = async (req, res) => {
  try {
    const userId = req?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const userData = await User.findById(userId).select(
      'username profile.avatar profile.country profile.experience elo',
    );

    let totalRating = 0;
    let totalGames = 0;
    for (let category in userData.elo.rating) {
      totalRating += userData.elo.rating[category];
      totalGames += userData.elo.gamesPlayed;
    }

    const averageRating = totalRating / Object.keys(userData.elo.rating).length;

    res.status(200).json({
      user: { ...userData._doc, averageRating: Math.floor(averageRating) },
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getHomepage;
