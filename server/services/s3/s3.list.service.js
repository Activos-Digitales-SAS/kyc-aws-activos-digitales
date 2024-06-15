const { ListObjectsV2Command } = require("@aws-sdk/client-s3");
const client = require('./s3.client');
const { AWS_BUCKET_NAME } = require('../../config/aws.config');

async function listFiles() {
    const command = new ListObjectsV2Command({
        Bucket: AWS_BUCKET_NAME
    });

    const { Contents } = await client.send(command);
    const fileUrls = Contents.map(file => ({
        key: file.Key,
        url: `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${file.Key}`
    }));

    return fileUrls;
}

module.exports = listFiles;
