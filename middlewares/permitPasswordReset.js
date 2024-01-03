/* eslint-disable prettier/prettier */
const userServices = require('../services/authServices');

// Check for permission to reset password
async function checkForPermitPasswordReset(req, res, next){

  try {
    // Get authorization token from headers
    // eslint-disable-next-line prefer-destructuring
    const authorization = (req.headers.authorization);

    // Get user's email from request body
    const { email } = req.body;

    // Check if authorization token is missing
    if (!authorization) {
      return res.status(403).json({ message: 'Authorization token missing' });
    }

    // Check if user has permission to reset password
    const permit = await userServices.checkResetPasswordPermit(
      email,
      authorization,
    );

    // Respond with unauthorized status if permit is invalid
    if (!permit) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid authorization token' });
    }

    // Proceed to the next middleware if permission is granted
    return next();
  } catch (error) {
    // Handle errors and respond with an error message
    return res
      .status(500)
      .json({ message: 'An error occurred', error: error.message });
  }
}


module.exports = {
  checkForPermitPasswordReset,
}