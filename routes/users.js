/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const {checkForPermitPasswordReset} = require('../middlewares/permitPasswordReset');

router.post('/register', userController.register);

router.post('/tests/verify-otp', userController.verifyUserMailOrPhone )

router.post('/tests/resend-otp', userController.resendOtpCode)

router.post('/login', userController.login);

router.post('/forget-password', userController.forgetPasswordPage);

router.post('/user-reset-password', checkForPermitPasswordReset, userController.passwordReset );

router.post('/user-change-password', userController.changePassword)

router.get('/user-profile', userController.profilePage);

router.patch('/update-user-data', userController.updateUserData)




module.exports = router