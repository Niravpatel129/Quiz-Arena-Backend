const register = require('./register');
const login = require('./login');
const appleLogin = require('./appleLogin');
const validateToken = require('./validateToken.js');
const facebookLogin = require('./facebookLogin');

module.exports = {
  register,
  login,
  appleLogin,
  validateToken,
  facebookLogin,
};
