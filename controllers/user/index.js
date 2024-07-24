const createUser = require('./createUser');
const getAllUsers = require('./getAllUsers');
const getUserById = require('./getUserById');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const addFriend = require('./addFriend');
const getFriends = require('./getFriends');
const getUserNotifications = require('./getUserNotifications');
const createUserNotification = require('./createUserNotification');
const deleteUserNotification = require('./deleteUserNotification');
const syncContacts = require('./syncContacts');
const updateAvatar = require('./updateAvatar');

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addFriend,
  getFriends,
  getUserNotifications,
  createUserNotification,
  deleteUserNotification,
  getUserById,
  syncContacts,
  updateAvatar,
};
