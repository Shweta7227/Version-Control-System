const fs = require('fs').promises;
const path = require('path');

async function addRepo(filePath){
    const repoPath= path.resolve(process.cwd(),".myGit");
    const stagingPath=path.join(repoPath,"staging");
    try{
        //check if the file exists
        await fs.access(filePath);
        //extract the file name from the file path
        const fileName=path.basename(filePath);
        //make sure the staging area exists
        await fs.mkdir(stagingPath,{recursive :true});
        //now make a copy of the file in the staging area
        await fs.copyFile(filePath,path.join(stagingPath,fileName));


        console.log("Adding file to staging area...Successfully");

    }catch(err){
        console.log("Error: Adding file to staging area",err);
    }
}
module.exports={addRepo};