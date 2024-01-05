const User = require('../../models/User');

const getUserById = async (req, res) => {
  try {
    if (!req.params.userId && !req.userId) return res.send('No user id provided');

    let userId = req.params.userId || req.userId;

    if (req.params.userId === 'undefined') {
      userId = req.userId;
    }

    const user = await User.findById(userId);

    const DataToSend = {
      userId: user._id,
      username: user.username,
      avatar:
        user.profile.avatar ||
        'https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg',
      country: user.profile.country || 'aq',
      experience: user.profile.experience,
      lastActive: user.lastActive || Date.now(),
      averageRating: user.elo.rating['General Knowledge'] || 1200,
      allRating: user.elo.rating,
      totalGames: user.elo.gamesPlayed || 0,
      winRate: (user.elo.wins / user.elo.gamesPlayed) * 100 || 0,
    };

    res.send(DataToSend);
  } catch (err) {
    console.log(err);
    res.send('Error getting user by id');
  }
};

module.exports = getUserById;
