const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Register function
const register = async (username, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return newUser;
  } catch (err) {
    console.error('register error: ', err.message);
    throw err;
  }
};

// Modified login function
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username: new RegExp('^' + username + '$', 'i') });

    if (!user) {
      user = await register(username, password); // Register the user if not found
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
    }

    const payload = { user: { id: user._id, name: user.username } };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res
      .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' })
      .status(200)
      .send({ token });
  } catch (err) {
    console.error('login error: ', err.message);
    res.status(500).send('Server error');
  }
};

module.exports = login;
