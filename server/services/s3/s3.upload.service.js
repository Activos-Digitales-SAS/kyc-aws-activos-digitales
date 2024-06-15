const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const client = require('./s3.client');
const { AWS_BUCKET_NAME } = require('../../config/aws.config');

async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath);

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    };

    const command = new PutObjectCommand(uploadParams);
    await client.send(command);

    return {
        Location: `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${file.name}`
    };
}

module.exports = uploadFile;
