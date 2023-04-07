const express = require("express");
const {PostModel} = require("../models/Posts.model");
const { UserModel } = require("../models/Users.model");

const PostRouter = express.Router();


//for getting all the posts related to a particular user
PostRouter.get("/",async(req,res)=>{
    const {email} =  req.body;
    
    try {
        let allPosts = await UserModel.findOne({email}).populate('user')
        res.send(allPosts);
    } catch (error) {
        console.log(error);
        res.status(404).send("something went wrong. Please try again after some time.");
    }
})

PostRouter.post("/create",async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = {PostRouter}

