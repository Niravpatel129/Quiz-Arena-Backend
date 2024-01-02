const User = require('../../models/User');

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const allowedUpdates = ['username', 'email', 'password', 'profile.avatar'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.json(user);
  } catch (err) {
    console.error('updateUser', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = updateUser;
