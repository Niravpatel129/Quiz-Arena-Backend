const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Register function
const register = async (email, password, country) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      profile: {
        country: country || 'aq',
      },
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
    console.log('🚀  errors:', errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, username, country, profile } = req.body;
  console.log('🚀  username:', username);
  console.log('🚀  profile:', profile);

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email: new RegExp('^' + email + '$', 'i') });

    if (!user) {
      console.log('user not found');
      user = await register(email, password, country);
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
    }

    if (username && username !== user.username) {
      user.username = username;
      await user.save();
    }

    if (!user?.profile?.avatar && profile?.avatar) {
      user.profile.avatar = profile.avatar;
      await user.save();
    }

    const payload = { user: { id: user._id, name: user.username, email: user.email } };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res
      .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' })
      .status(200)
      .send({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          elo: user.elo,
          profile: user.profile,
          friends: user.friends,
          notifications: user.notifications,
        },
      });
  } catch (err) {
    console.error('login error: ', err.message);
    res.status(500).send('Server error');
  }
};

module.exports = login;
