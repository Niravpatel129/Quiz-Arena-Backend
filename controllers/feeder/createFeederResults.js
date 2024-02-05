const Feeder = require('../../models/Feeder');

const createFeederResults = async (req, res) => {
  try {
    const {
      userId,
      body: { scoreAchieved, category },
    } = req;

    // Insert the new feeder document
    const feeder = await Feeder.create({
      user: userId,
      scoreAchieved,
      category,
    });

    // Calculate the total number of scores in the category including the new score
    const totalScores = await Feeder.countDocuments({ category });

    // Calculate the number of scores less than the new score
    const scoresLessThanUser = await Feeder.countDocuments({
      category,
      scoreAchieved: { $lt: scoreAchieved },
    });

    // Percentile rank for the new score
    const percentileRank = (scoresLessThanUser / totalScores) * 100;

    // Fetch the personal best score
    const personalBest = await Feeder.findOne({ user: userId, category })
      .sort('-scoreAchieved')
      .exec();

    // Assuming personalBest exists and calculating its percentile rank
    let personalBestPercentileRank = null;
    if (personalBest) {
      const scoresLessThanPersonalBest = await Feeder.countDocuments({
        category,
        scoreAchieved: { $lt: personalBest.scoreAchieved },
      });
      personalBestPercentileRank = (scoresLessThanPersonalBest / totalScores) * 100;
    }

    console.log('🚀 Feeder Ended', userId, category, scoreAchieved);

    res.status(201).send({
      feeder: {
        id: feeder._id,
        scoreAchieved: feeder.scoreAchieved,
        category: feeder.category,
      },
      percentileRank: percentileRank.toFixed(2),
      personalBest: personalBest ? personalBest.scoreAchieved : null,
      personalBestPercentileRank: personalBestPercentileRank
        ? personalBestPercentileRank.toFixed(2)
        : null,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = createFeederResults;
