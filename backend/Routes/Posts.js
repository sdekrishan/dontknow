const express = require("express");
const {PostModel} = require("../models/Posts.model");

const PostRouter = express.Router();

PostRouter.get("/",async(req,res)=>{
    try {
        let allPosts = await PostModel.find();
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

