const User = require('../../models/User');

const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    await User.findByIdAndDelete(userId);
    console.log('🚀  user deleted');

    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = deleteUser;
