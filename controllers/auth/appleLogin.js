const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const appleLogin = async (req, res) => {
  try {
    console.log('appleLogin req.body', req.body);

    const { appleId, email, username, country } = req.body;
    let databaseUser = null;
    let newSignIn = false;

    if (!username || !email) {
      // assume appleId is present and login the user

      if (!appleId) {
        return res.status(400).send('AppleId is required');
      }

      const user = await User.findOne({ 'misc.appleId': appleId });

      if (user) {
        databaseUser = user;
      }
    }

    if (username && email && appleId) {
      // find same username
      const sameUsername = await User.find({ username });
      let usernameToSet = username;
      if (sameUsername) {
        usernameToSet = `${username}${Math.floor(Math.random() * 1000)}`;
      }

      const newUser = new User({
        usernameToSet,
        email,
        profile: {
          country,
        },
        misc: {
          appleId,
        },
      });
      await newUser.save();

      databaseUser = newUser;
      newSignIn = true;
    } else {
      // create a new user with generated Email + generated Username
      const newUser = new User({
        username: `${Math.floor(Math.random() * 100000)}`,
        email: `${Math.floor(Math.random() * 100000)}@apple.com`,
        profile: {
          country,
        },
        misc: {
          appleId,
        },
      });

      await newUser.save();

      databaseUser = newUser;
      newSignIn = true;
    }

    console.log('🚀  databaseUser:', databaseUser);

    const payload = {
      user: {
        id: databaseUser._id,
        username: databaseUser.username,
        email: databaseUser.email,
        avatar: databaseUser?.profile?.avatar || null,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res
      .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' })
      .status(200)
      .send({
        token,
        user: {
          id: databaseUser._id,
          username: databaseUser.username,
          email: databaseUser.email,
          elo: databaseUser.elo,
          profile: databaseUser.profile,
          friends: databaseUser.friends,
          notifications: databaseUser.notifications,
        },
        newSignIn,
      });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error with apple login');
  }
};

module.exports = appleLogin;
