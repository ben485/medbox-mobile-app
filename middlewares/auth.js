/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/jwtKeys');

// This function is an Express middleware for authenticating JWT tokens.
// It takes three parameters: `req` (request), `res` (response), and `next` (a function to call the next middleware in the chain).

const authenticateToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication required. Token not provided.' });
  }

  jwt.verify(token, jwtSecret, (error, user) => { // Remove the 'next' argument here
    if (error) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next(); // Call 'next' to move to the next middleware
  });
};

 
const generateAccessKey = (user) => {
  // This function generates a JWT access token based on the provided `username`.
  // It takes the `username` as input and returns a JWT token as the output.
 
  return jwt.sign({ data: user }, jwtSecret, { expiresIn: jwtExpiresIn });
  // The `jwt.sign` function is used to create the JWT token.
  // It takes three arguments: the data to be included in the token (in this case, `{ data: username }`),
  // the JWT secret key (`jwtSecret`), and options such as token expiration (`expiresIn`).
 
  // The generated token will contain the payload with the `username` data and will be signed using the `jwtSecret`.
  // The token will be valid for the duration specified in `jwtExpiresIn`.
 };

module.exports = {
  authenticateToken,
  generateAccessKey,
}