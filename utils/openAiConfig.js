/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */

const dotenv = require('dotenv');
const {OpenAI} = require('openai')

dotenv.config({ path: './config.env' });

 const openai = new OpenAI({
    apiKey: process.env.CHATGPT_SECRET_KEY,
  });

  module.exports = {
    openai
  }