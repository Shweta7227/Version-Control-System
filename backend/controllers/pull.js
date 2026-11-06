const fs = require("fs").promises;
const path = require("path");

const { s3Client, S3_BUCKET } =
    require("../config/aws-config.js");

const {
    ListObjectsV2Command,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

async function pullReq() {
    const repoPath = path.resolve(process.cwd(), ".myGit");

    try {
        // 1. List all objects stored in Backblaze
        const command = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: "commits/"
        });

        const data = await s3Client.send(command);

        const objects = data.Contents || [];

        // 2. Process every object
        for (const obj of objects) {

            const key = obj.Key;

            // Skip empty or folder-marker keys
            if (!key || key.endsWith("/")) continue;

            // 3. Construct local file path
            const localFilePath = path.join(repoPath, key);

            // 4. Create the required parent directory
            await fs.mkdir(path.dirname(localFilePath), {
                recursive: true
            });

            // 5. Download the object from Backblaze
            const response = await s3Client.send(
                new GetObjectCommand({
                    Bucket: S3_BUCKET,
                    Key: key
                })
            );

            // 6. Convert response stream into bytes
            const fileContent = await response.Body.transformToByteArray();

            // 7. Write downloaded content locally
            await fs.writeFile(localFilePath, fileContent);
        }

        console.log("Successfully pulled all commits from S3 bucket");

    } catch (err) {
        console.error("Error in pullReq:", err);
    }
}

module.exports = { pullReq };
