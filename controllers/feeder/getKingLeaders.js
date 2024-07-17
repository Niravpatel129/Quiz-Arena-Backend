const Feeder = require('../../models/Feeder');

const getKing = async (req, res) => {
  try {
    const category = req.params.category.replaceAll('-', ' ') || 'general knowledge';
    console.log('🚀  category:', category);

    const topScorers = await Feeder.aggregate([
      { $match: { category: category } },
      { $sort: { scoreAchieved: -1 } },
      { $limit: 2 },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          'userDetails.username': 1,
          'userDetails.profile': 1,
          scoreAchieved: 1,
          category: 1,
          updatedAt: 1,
        },
      },
    ]);

    if (!topScorers.length) {
      return res.status(404).send({ message: 'No players found in this category.' });
    }

    res.status(200).send(topScorers);
  } catch (err) {
    console.error('Error finding highest scorers:', err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = getKing;
