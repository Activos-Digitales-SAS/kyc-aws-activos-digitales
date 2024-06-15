const { GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const client = require('./s3.client');
const pipelineAsync = promisify(pipeline);


async function readFile(fileName) {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: fileName
    });
  
    const result = await client.send(command);
  
    // Utilizamos pipeline para manejar el stream correctamente
    await pipelineAsync(result.Body, fs.createWriteStream('./images/newimage.png'));
  
    return result.Body;
  }
  module.exports = readFile;
