const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

module.exports = getAllUsers;
