const Feeder = require('../../models/Feeder');

const getKingLeaders = async (req, res) => {
  try {
    const category = req.params.category.replaceAll('-', ' ') || 'general knowledge';
    console.log('🚀  category:', category);

    const topScorers = await Feeder.aggregate([
      { $match: { category: category } },
      { $sort: { scoreAchieved: -1 } },
      {
        $group: {
          _id: '$user',
          scoreAchieved: { $first: '$scoreAchieved' },
          category: { $first: '$category' },
          updatedAt: { $first: '$updatedAt' },
        },
      },
      { $limit: 20 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
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
      { $sort: { scoreAchieved: -1 } }, // Add this stage to sort by scoreAchieved in descending order
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

module.exports = getKingLeaders;
