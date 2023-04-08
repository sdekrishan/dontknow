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

PostRouter.post("/",async(req,res)=>{
    const {userId,content} = req.body;
    try {   
        const post = new PostModel({userId,content});
        await post.save();
        const user = await UserModel.find({_id:userId});
        const userPosts=  user[0].posts;
        await UserModel.findByIdAndUpdate({_id:userId},{posts:[...userPosts,post._id]})
        res.send("post added successfully")
    } catch (error) {
        console.log(error);
    }
})

//get all posts 

PostRouter.get("/all",async(req,res)=>{
    const {userId} = req.body;
    try {
        const allPosts = await PostModel.find({userId});
        const user = await UserModel.findOne({_id:userId})
        console.log(user);
        const usersFriendsPosts=  await Promise.all(
            user.friends.map((el)=>PostModel.find({userId:el}))
        )
        console.log(allPosts,usersFriendsPosts);
        res.send(allPosts.concat(usersFriendsPosts.flat(1)))
    } catch (error) {
        res.send(error)
        console.log(error);
    }
})

module.exports = {PostRouter}

