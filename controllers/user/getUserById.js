const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.send(user);
};

module.exports = getUserById;
