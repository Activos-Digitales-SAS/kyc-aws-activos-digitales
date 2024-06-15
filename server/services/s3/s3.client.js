const { S3Client } = require("@aws-sdk/client-s3");
const { AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION } = require('../../config/aws.config');

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: AWS_PUBLIC_KEY,
      secretAccessKey: AWS_SECRET_KEY
    }
  });

  module.exports = client;