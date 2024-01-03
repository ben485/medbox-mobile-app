/* eslint-disable prettier/prettier */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({ path: './config.env' });

const SMSConfiguration = (txt, telephone) => {
    const data = {"sender": "TELICAL",
    "message": txt,
    "recipients": [`${telephone}`]
  };

    const config = {
        method: 'post',
        url: 'https://sms.arkesel.com/api/v2/sms/send',
        headers: {
        'api-key': process.env.ARKESEL_API_KEY
    },
    data : data
    };


    axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
          return JSON.stringify(response.data) 
        })
        .catch(function (error) {
          console.log('sms error')
          //throw error;
        });

}


module.exports = {
  SMSConfiguration
}