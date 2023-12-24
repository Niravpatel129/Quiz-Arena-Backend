const createUser = require('./createUser');
const getAllUsers = require('./getAllUsers');
const getUserById = require('./getUserById');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const addFriend = require('./addFriend');
const getFriends = require('./getFriends');
const getUserNotifications = require('./getUserNotifications');
const createUserNotification = require('./createUserNotification');

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  getFriends,
  getUserNotifications,
  createUserNotification,
};
