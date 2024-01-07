const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const facebookLogin = async (req, res) => {
  try {
    console.log('facebookLogin req.body', req.body);

    const { userID, name, email, profilePicture, accessToken } = req.body;
    if (!accessToken || !userID || !name || !email) {
      return res.status(400).send('Missing required fields');
    }

    // Validate the accessToken with Facebook, if necessary

    // Check if user already exists in the database
    let databaseUser = await User.findOne({ 'misc.facebookId': userID });

    // If user doesn't exist, create a new user
    if (!databaseUser) {
      const isUsernameTaken = await User.findOne({ username: name });

      const newUser = new User({
        username: !isUsernameTaken ? name : `${name}${Math.floor(Math.random() * 1000)}`,
        email,
        profile: {
          avatar: profilePicture,
        },
        misc: {
          facebookId: userID,
        },
      });
      await newUser.save();
      databaseUser = newUser;
    } else {
      databaseUser.profile.avatar = profilePicture;
      await databaseUser.save();
    }

    // Create JWT payload and token
    const payload = {
      user: { id: databaseUser._id, name: databaseUser.username, email: databaseUser.email },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // Send response
    res
      .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' })
      .status(200)
      .send({
        token,
        user: {
          id: databaseUser._id,
          username: databaseUser.username,
          email: databaseUser.email,
          profilePicture: databaseUser.profilePicture, // Include the profile picture in the response
          elo: databaseUser.elo,
          profile: databaseUser.profile,
          friends: databaseUser.friends,
          notifications: databaseUser.notifications,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error with Facebook login');
  }
};

module.exports = facebookLogin;
