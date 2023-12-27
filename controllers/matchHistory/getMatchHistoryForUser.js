const GameSession = require('../../models/GameSession');

const getMatchHistoryForUser = async (req, res) => {
  try {
    const userId = req.userId;

    const matchHistory = await GameSession.find({
      players: { $elemMatch: { id: userId } },
    })
      .limit(20)
      .sort({ startTime: -1 });

    res.status(200).json({ matchHistory, userId: req.userId });
  } catch (error) {
    console.log('🚀  error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getMatchHistoryForUser;
