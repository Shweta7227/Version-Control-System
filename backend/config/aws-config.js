//here we are going tp do config of aws : how to connect to aws and how to upload files to aws s3 bucket
const dotenv = require("dotenv");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env");
// console.log("Expected env path:", envPath);
const result = dotenv.config({
    path: envPath
});

// console.log("Dotenv result:", result.error || "File loaded successfully");
const { S3Client } = require("@aws-sdk/client-s3");


const s3Client = new S3Client({
    endpoint: process.env.B2_ENDPOINT,
    region: process.env.B2_REGION,
    credentials: {
        accessKeyId: process.env.B2_KEY_ID,
        secretAccessKey: process.env.B2_APPLICATION_KEY
    }
});

const S3_BUCKET = process.env.B2_BUCKET_NAME;
// console.log("========== B2 DEBUG ==========");

// console.log("B2_ENDPOINT:", process.env.B2_ENDPOINT);
// console.log("B2_REGION:", process.env.B2_REGION);
// console.log("B2_BUCKET_NAME:", process.env.B2_BUCKET_NAME);

// console.log("Region type:", typeof process.env.B2_REGION);

// console.log("==============================");
module.exports = { s3Client, S3_BUCKET };