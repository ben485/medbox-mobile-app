/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const validator = require('validator');

const passwordResetAuth = new mongoose.Schema({
  authorization: {
    type: String,
    required: ['Please input name', true],
  },

  email: {
    type: String,
    required: ['Please input email', true],
  },
});

// eslint-disable-next-line camelcase
const reset_password_keys = mongoose.model(
  'reset_password_keys',
  passwordResetAuth,
);

module.exports = reset_password_keys;
