const User = require('../../models/User');

const createUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and password are required');
    return;
  }

  try {
    const user = new User(req.body);
    await user.save();

    res.send(user);
  } catch (err) {
    res.send(err);
  }
};

module.exports = createUser;
