/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');

// Configure AWS S3 client
const awsS3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'AKIAWTGALNJR4Y3JXWJI',
      secretAccessKey: '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',
    },
  });


  // Configure Multer to handle file uploads
const upload = multer();


module.exports = {
    awsS3Client,
    upload
}
  