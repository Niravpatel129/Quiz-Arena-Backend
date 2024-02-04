const Feeder = require('../../models/Feeder');

const getKing = async (req, res) => {
  try {
    const category = req.params.category || 'general knowledge';
    console.log('🚀  category:', category);
    const highestScorer = await Feeder.findOne({ category: category }) // Find documents matching the category
      .sort({ scoreAchieved: -1 }) // Sort them by scoreAchieved in descending order
      .populate({
        path: 'user',
        select: 'username profile',
      })
      .exec(); // Execute the query

    if (!highestScorer) {
      return res.status(404).send({ message: 'No players found in this category.' });
    }

    res.status(200).send(highestScorer);
  } catch (err) {
    console.error('Error finding highest scorer:', err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = getKing;
