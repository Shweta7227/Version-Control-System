//IMPORTING :)
const yargs = require("yargs");
//this will help us to understand the agrument in commands
const { hideBin } = require('yargs/helpers');
const { initRepo } = require("./controllers/init.js");
const {addRepo}=require("./controllers/add.js");
const {commitRepo}=require("./controllers/commit.js");
const {pullReq}=require("./controllers/pull.js");
const {pushReq}=require("./controllers/push.js");
const {revertReq}=require("./controllers/revert.js");

//use yargs:
//init :initialization of repositpry
yargs(hideBin(process.argv)).command(
    'init',  //that is our command
    "Initialize a new repository",//Cmnd description 
    {},  //parameter (they are empty)
    initRepo //to which file/function control should be passed
)
.command("add <file>", "Add a file to the repository",(yargs)=>{
    yargs.positional("file",{
        describe:"File to add to the staging area",
        type:"string",
    })
}, addRepo)
.command("commit <message>", "Commit the staged file ",(yargs)=>{
    yargs.positional("message",{
        describe:"Commit message",
        type:"string",
    })}, commitRepo)
.command("pull", "Pull commits from S3",{}, pullReq)
.command("push", "Push commits to S3",{}, pushReq)
.command("revert <commitID>", "Revert to a specific commit",(yargs)=>{
    yargs.positional("commitID",{
        describe:"Commit id to revert to ",
        type:"string",
    })}, revertReq)
.demandCommand(1, "You need atleast one command").help().argv;
