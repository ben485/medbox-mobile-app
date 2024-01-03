/* eslint-disable prettier/prettier */
const ejs = require("ejs");

//const {emailTransporter} = require('../utils/nodeMailerConfig')
// eslint-disable-next-line no-unused-vars
const sendEmailSendgrid = require('../sendGridconfiq')
const {sendEmailNodeMailer} = require('../nodeMailerConfig')

 
 const sendLoginDetails = async(Data) => {
    try {
       const email = (Data.email).trim()
        // eslint-disable-next-line no-path-concat, prefer-template
        const data = await ejs.renderFile(__dirname + "/viewTemplate/loginDetail.ejs", {Data});

        const mainOptions = {
           from: 'Abibiman Tele-Health <benjamin.andoh@abibiman.org>',
           to: email,
           subject: 'Login details to Abibiman Tele-health',
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
     sendLoginDetails
 }