/* eslint-disable prettier/prettier */
const ejs = require("ejs");

//const {emailTransporter} = require('../utils/nodeMailerConfig')
// eslint-disable-next-line no-unused-vars
const sendEmailSendgrid = require('../sendGridconfiq')
const {sendEmailNodeMailer} = require('../nodeMailerConfig')

 
 const sendVerificationOtp = async(Data) => {
    try {
       const email = (Data.email).trim()
        // eslint-disable-next-line no-path-concat, prefer-template
        const data = await ejs.renderFile(__dirname + "/viewTemplate/verifyEmail.ejs", {Data});

        const mainOptions = {
           from: 'TELICAL HEALTH CARE<benjamin.andoh@abibiman.org>',
           to: email,
           subject: 'Otp Verification details from Telical',
           html: data
          };

          sendEmailNodeMailer.sendMail(mainOptions, (err, info) => {
           if (err) {
               console.log(err);
           }else{
              console.log(info)
           }
           });

    } catch (error) {
              console.log(error);
    }
 }

 


 module.exports = {
     sendVerificationOtp
 }