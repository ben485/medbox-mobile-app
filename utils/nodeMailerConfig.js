/* eslint-disable prettier/prettier */
const nodemailer = require("nodemailer");

const sendEmailNodeMailer = nodemailer.createTransport({
  // eslint-disable-next-line prettier/prettier
  host:'smtp.zoho.com',
  port:465,
  secure:true,
  auth: {
    user:'benjamin.andoh@abibiman.org',
    pass:'Kingdom1996?'
  },

  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
},

from: 'benjamin.andoh@abibiman.org'
});

module.exports = {
  sendEmailNodeMailer
}