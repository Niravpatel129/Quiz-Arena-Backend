const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const validateToken = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('_id username email');

    const payload = { user: { id: user._id, name: user.username, email: user.email } };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });

    // res.json({ userId: req.userId, name: req.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Token is not valid');
  }
};

module.exports = validateToken;
