const User = require('../../models/User');

const updateUser = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });

    console.log('updateUser', req.body);
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const allowedUpdates = ['username', 'email', 'password', 'profile'];
    const updates = Object.keys(req.body);
    console.log('🚀  updates:', updates);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    console.log('🚀  user:', user);

    res.json(user);
  } catch (err) {
    console.error('updateUser', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = updateUser;
