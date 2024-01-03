/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-useless-catch */
// Handler for the "forget password" feature
const otpModel = require('../models/otpModel')
const factory = require('../services/factoryServices');

const { sendVerificationOtp } = require('../utils/EmailTemplate/sendVerificationOtp');
const {SMSConfiguration} = require('../utils/SMSConfig')


  async function createOtp(email, phoneNumber, name, callback){
    try {
        const min = 1000;
        const max = 9999;
        const otp = Math.floor(Math.random() * (max - min + 1) + min);
        const timeSeconds = new Date().getTime()
        const data = {email, phoneNumber, otp, timeSeconds};

        await factory.saveToDb(otpModel, data);
        sendVerificationOtp({email, name, otp})
        SMSConfiguration(`Otp verification. \n\n ${otp}`, phoneNumber);
        return callback(null);
    } catch (error) {
      return callback({ message: error });
    }
  }



  module.exports = {
    createOtp
  }