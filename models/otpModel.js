/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const activityModel = new mongoose.Schema({
  email: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },

  otp: {
    type:String,
  },

  timeSeconds: {
    type: Number,
  }

});

const otps = mongoose.model('otps', activityModel);
module.exports = otps;