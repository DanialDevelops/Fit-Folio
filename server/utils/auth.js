const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  comparePasswords: function (inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
};
