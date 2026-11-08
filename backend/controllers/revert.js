const fs = require('fs');
const path = require('path');
const { s3Client, S3_BUCKET } = require('../config/aws-config.js');
const {promisify} = require('util');

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);
console.log("readDir", readdir);
console.log("copyFile", copyFile);
async function revertReq(commitID){
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");
    try{
        const commitDir = path.join(commitsPath, commitID);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");
        for(const file of files){
            await copyFile(path.join(commitDir, file), path.join(parentDir,file));
        }
        console.log("Successfully reverted");
    }catch(err){
        console.log("Error in revertReq:", err);
    }


}
module.exports={revertReq};