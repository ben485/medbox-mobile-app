/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require('express');
const morgan = require('morgan');
const { unless } = require('express-unless');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');


const auth = require('./middlewares/auth');
const error = require('./middlewares/error');

const app = express();

// Define a custom CORS middleware
const allowCrossOrigin = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // You can replace '*' with specific origins
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
 
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(204); // No Content for preflight requests
  } else {
    next();
  }
 };

app.use(allowCrossOrigin);

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// This line is setting a property `unless` on the `authenticateToken` function, allowing the use of the `unless` middleware.
auth.authenticateToken.unless = unless;

// This line is adding the `auth.authenticateToken` middleware to the Express application.
// The middleware is configured with the `unless` function, which will skip authentication for specific paths and HTTP methods.
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: '/users/login', methods: ['POST'] },
    ],
  }),
);

// Sanitize user input data before reaching other middlewares
app.use(mongoSanitize());

app.use(express.json());

//  ROUTES
app.use('/auth', require('./routes/users'));


/////Express Error Handler
app.use(error.errorHandler);
module.exports = app;
