/* eslint-disable prettier/prettier */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({ path: './config.env' });

// Set the default promise implementation to the global Promise constructor
mongoose.Promise = global.Promise;


const DB = process.env.DATABASE
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Succes');
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
