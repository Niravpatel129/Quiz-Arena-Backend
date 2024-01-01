const User = require('../../models/User');

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  console.log('🚀  user:', user);

  const DataToSend = {
    userId: '1',
    username: 'John Doe',
    avatar:
      'https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg',
    country: 'aq',
    lastActive: '8 min ago',
    averageRating: '2212',
    totalGames: '11230',
    winRate: '44%',
  };

  res.send(DataToSend);
};

module.exports = getUserById;
