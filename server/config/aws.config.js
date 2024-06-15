require('dotenv').config();

const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

module.exports = {
    AWS_PUBLIC_KEY,
    AWS_SECRET_KEY,
    AWS_BUCKET_NAME,
    AWS_BUCKET_REGION
  };