const User = require('../../models/User');

const getUserById = async (req, res) => {
  try {
    if (!req.params.userId && !req.userId) return res.send('No user id provided');

    let userId = req.params.userId || req.userId;

    if (req.params.userId === 'undefined') {
      userId = req.userId;
    }

    const user = await User.findById(userId);
    console.log('🚀  user:', user);

    const DataToSend = {
      userId: '6591c1859fa3eac30e5e9ecb',
      username: 'John Doe',
      avatar:
        user.profile.avatar ||
        'https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg',
      country: user.profile.country || 'aq',
      experience: user.profile.experience,
      lastActive: '8 min ago',
      averageRating: '2212',
      totalGames: '11230',
      winRate: '44%',
    };

    res.send(DataToSend);
  } catch (err) {
    console.log(err);
    res.send('Error getting user by id');
  }
};

module.exports = getUserById;
