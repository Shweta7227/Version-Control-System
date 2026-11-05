const fs= require("fs").promises;
const path=require("path");
const {v4:uuidv4}= require("uuid");



async function commitRepo(message){
    try{
        const repoPath=path.resolve(process.cwd(),".myGit");
        const commitsPath=path.join(repoPath,"commits");  
        const stagingPath=path.join(repoPath,"staging");  
        //make a unique commitID
        const commitID = uuidv4();   
        //make a commitID folder inside commits folder    
        const commitDirs=path.join(commitsPath,commitID);
        await fs.mkdir(commitDirs,{recursive:true});
        //copy all files from staging area to commitID folder
        const files= await fs.readdir(stagingPath);
        for(const file of files){
            await fs.copyFile(path.join(stagingPath,file),path.join(commitDirs,file));
            await fs.writeFile(path.join(commitDirs,"config.json"),JSON.stringify({message:message,commitID:commitID,date:new Date().toISOString()}));
        }
        //delete the files from staging area after commit
        for(const file of files){
            await fs.unlink(path.join(stagingPath,file));
        }
        console.log("Successfully commitid dir made with commitID: ",commitID);

    }catch(err){
        console.error("Error in commitRepo: ",err);
    }

}

module.exports={commitRepo};