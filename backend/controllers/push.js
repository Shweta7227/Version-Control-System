const fs = require('fs').promises;
const path = require('path');
const { s3Client, S3_BUCKET } = require('../config/aws-config.js');
const {PutObjectCommand} = require("@aws-sdk/client-s3");

async function pushReq(){
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");
    try{
        const commitDirs = await fs.readdir(commitsPath);
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);
            for (const file of files) {
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                const uploadParams = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent
                };  
                const command = new PutObjectCommand(uploadParams);
                await s3Client.send(command);
            }
        }
        console.log("Successfully pushed all commits to S3 bucket");
    }catch(err){
        console.error("Error in pushReq: ",err);
    }
}

module.exports={pushReq};