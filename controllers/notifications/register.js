const User = require('../../models/User');

const register = async (req, res) => {
  try {
    const userId = req.userId;
    const pushToken = req.body.pushToken;

    if (!userId || !pushToken) return res.send('No user id or push token provided');

    await User.findOneAndUpdate({ _id: userId }, { $set: { pushToken: pushToken } });

    res.send('User registered for notifications');
  } catch (err) {
    console.log(err);
    res.send('Error registering user for notifications');
  }
};

module.exports = register;
