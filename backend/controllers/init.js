const fs =require("fs").promises;
//we need a path to get to know where we want to work /path
const path = require("path");


async function initRepo(){
    const repoPath =path.resolve(process.cwd(), ".ShwetaGit");
    const commitPath = path.resolve(repoPath,"commits");
    try{ 
        //recursive true give access to make folder in existing folder
        await fs.mkdir(repoPath,{recursive : true});
        await fs.mkdir(commitPath,{recursive :true});
        await fs.writeFile(path.join (repoPath,"config.json"),JSON.stringify({bucket:process.env.S3_BUCKET}) )
        console.log("Repository initialized");
    }catch(err){
        console.error("Error initializing repository",err);
    }
}
module.exports= {initRepo};