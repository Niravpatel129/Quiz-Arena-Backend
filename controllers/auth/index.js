const register = require('./register');
const login = require('./login');
const appleLogin = require('./appleLogin');
const validateToken = require('./validateToken.js');

module.exports = {
  register,
  login,
  appleLogin,
  validateToken,
};
