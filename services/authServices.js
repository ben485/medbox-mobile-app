/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
const bcrypt = require('bcryptjs');

const UserModel = require('../models/userModel');
const otpModel = require('../models/otpModel');
const ResetPasswordKeys = require('../models/resetPassWordModel');


const auth = require('../middlewares/auth')


/////This function accept the email bing used for registration and a callback. It checks to see if the email is already registered or not. if the email is registered it return and error message.
async function checkEmail(email, callback){
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return callback({ message: 'Email registered already' });
      } 
        return callback(null);
      
    } catch (error) {
      return error;
    }
  }

  /////////////////Checking for the uniqueness of the telephone number//////////////
async function checkTelephone(phoneNumber, callback){
    try {
       const user = await UserModel.findOne({ phoneNumber });
      if (user) {
        return callback({ message: 'Telephone number registered already' });
      } 
        return callback(null);
      
    } catch (error) {
      return error;
    }
  }


  // This function handles user registration with the provided `params`.
// It is an asynchronous function and expects a callback to handle the result or error.
async function Register(params, callback) {
    try {
      // Creating a new User instance with the provided `params`.
      const user = new UserModel(params);
  
      // Using `await` to wait for the asynchronous operation of saving the user to the database.
      const response = await user.save();
  
      // If successful, call the callback with null (no error) and the saved `response`.
      return callback(null, response);
    } catch (error) {
      // If an error occurs during the registration process, call the callback with the error.
  
      return callback(error);
    }
  }


  async function Login({email, password}, callback) {
    try {
       if(email === "" || password === "" || email === undefined || password === undefined){
         callback({
          message: 'Please Provide Password and Email',
         });
     }

     const query = {
        $or: [{ email: email}, { phoneNumber: email}],
      } 

      const user = await UserModel.findOne(query).select('+password');
      if(!user){
        callback({
            message: 'The user is not registered',
         });
      }

      if(user.verifyUser !== true){
        callback({
            message: 'verification-needed',
         }); 
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
        //////////////If comparison has an error, send an error message to callback
        callback({
          message: 'Error in decrypting password',
        });
       }
        
       if(!result){
        callback({
            message: 'Invalid password/email',
          });
        }

         ///////////////Generate an access token based on user data
         const token = auth.generateAccessKey({
            userID: user.userID,
            verifyUser: user.verifyUser,
          });
 
          ////////////////Create userData object with selected user details and the generated token
          const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
            phoneNumber: user.phoneNumber,
            userID: user.userID,
            token: token,
          };
          callback(null, userData);
     })

    } catch (error) {
        return callback(error); 
    }
  }


  async function verifyUserEmailOrPhone(data, callback) {
    try {
      const { email, otp } = data;
      const otpData = await otpModel.findOne({ email, otp });
      
      if (!otpData) {
        return callback('Wrong otp');
      }
  
      const otpSentTimeSeconds = otpData.timeSeconds;
      const currentTimeSeconds = new Date().getTime();
      const otpExpirationThreshold = 300000; // 5 minutes
      const diff = currentTimeSeconds - otpSentTimeSeconds;
      if (diff > otpExpirationThreshold) {
        return callback('The OTP code has expired');
      }
  
      const query = { email };
      const updateItem = { verifyUser: true };
      const response = await UserModel.findOneAndUpdate(query, updateItem, { new: true });
  
      return callback(null, response);
    } catch (error) {
      return callback(error);
    }
  }
  
  async function forgetpassword(email, callback) {
    // This function is an asynchronous function that handles the "forget password" feature.
    // It takes an `email` as input and attempts to find a user with the provided email in the database.
    try {
      // Using `await` to wait for the asynchronous operation of finding the user in the database.
      const user = await UserModel.findOne({ email });
  
      if (user) {
        // If a user with the provided email is found in the database,
        // return a 200 OK response with the user data in the response body.
        return callback(null, user);
      // eslint-disable-next-line no-else-return
      } else {
        // If no user is found with the provided email, return a 401 Unauthorized response
        // with a message indicating that the email is not registered.
  
        return callback({
          message: 'Email not registered',
        });
      }
    } catch (error) {
      // If any error occurs during the process (e.g., database error),
      // call the `next` function to pass the error to the next error-handling middleware.
  
      return error;
    }
  }

  ///////This checks if user resetting his password has auth keys. The rest password auth keys are created when a user submit his email and that email matches record in users collection.
async function checkResetPasswordPermit(email, authorization){
    try {
      const query = { email:email, authorization:authorization}
      const user = await ResetPasswordKeys.findOne(query);
  
      return user
  
    } catch (error) {
  
      return error;
    }
  }

  // Store reset password data in the database
async function storeResetPasswordData(Data, callback){
  
    try {
       // Create a new reset_password_keys document
       // eslint-disable-next-line new-cap
       const resetData = new ResetPasswordKeys(Data);
       // Save the document to the database
       const response = await resetData.save();
   
       return callback(null, response)
   
     } catch (error) {
       // If an error occurs, pass it to the callback
       return callback(error);
   
    }
   }


   ////////////////updating a new password in the database
async function resetPassword(newPassword, email, callback) {
    try {
      const query = { email: email };
  
      const updateItem = { password: newPassword };
      
      const response = await UserModel.findOneAndUpdate(query, updateItem, { new: true });
  
      if (!response) {
        // Handle the case when no user is found with the given email
        return callback({ message: 'There is no item to update' });
      }
      ///if a user is found, the password will be updated and returns a callback with the response.
      return callback(null, response);
  
    } catch (error) {
  
      return callback(error)
  
    }
  }
  
  
  
  //////////////After successful password reset, the password reset keys generated during the process will be deleted from reset_password_keys collection. this function handles the deletion of keys associated with user email.
  async function deleteResetPasswordData(email, callback){
    try {
      const response = await ResetPasswordKeys.deleteMany({ email: email });
  
      return callback(null, response);
    } catch (error) {
      return callback(error);
    }
  }


  async function checkIfPasswordExist(email, oldPassword, callback){

    const query = {email:email}
    const user = await UserModel.findOne(query).select('+password');
    if(!user){
      return callback({ message: 'there is an error in matching user data' });
    }
  
    bcrypt.compare(oldPassword, user.password, function (err, result) {
      if (err) {
        //////////////If comparison has an error, send an error message to callback
        return callback({ message: 'There is an error in decrypting password'})
       }
  
       if(result === false){
        return callback({ message: 'The old password entered does not match the email provided'})
       }
  
       return callback(null, result)
  
    })
  }
  
  module.exports = {
    checkEmail,
    checkTelephone,
    Register,
    Login,
    verifyUserEmailOrPhone,
    forgetpassword,
    storeResetPasswordData,
    resetPassword,
    deleteResetPasswordData,
    checkIfPasswordExist,
    checkResetPasswordPermit
  }