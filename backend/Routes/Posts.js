const express = require("express");
const fs = require("fs")
const PostRouter = express.Router();
const {PostModel} = require("../models/Posts.model");
const { UserModel } = require("../models/Users.model");
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "dwkrorz1k",
  api_key: "272165627193615",
  api_secret: "BROfva11bTlvSZGy1a1eaVGbcbE",
//   secure:true
});

//for getting all the posts related to a particular user
PostRouter.get("/:id",async(req,res)=>{
    // const {id} =  req.body;
    const {id} = req.params
    
    try {
        let allPosts = await PostModel.find({userId:id}).populate("userDetails");
        return res.send(allPosts);
    } catch (error) {
        console.log(error);
        return res.status(404).send("something went wrong. Please try again after some time.");
    }
})


//for creating a post

PostRouter.post("/create/:id",async(req,res)=>{
    //we will take the id and find the user with it then we get the img file from req.files 
    // and content and id from req.body 
    const {id} = req.params;
    let undefinedImg = "" //we take this variable bcoz what if a user don't want to share any picture and if so 
    // then we get the error that can't read undefined property of req.files that's why we made this logic

    const img = req.files === null ? undefinedImg : req.files.img;
    const postId = req.body.id;
    const content = req.body.content;

     try {
         const user = await UserModel.findById(id);
         if(user){
            // fs.mkdirSync("/tmp", { recursive: true })
           const mycloud = req.files === null ? "" : await cloudinary.uploader.upload(img.tempFilePath,{
            folder:"img",
           });
        let newPost = new PostModel({userId:postId,userDetails:postId,picture:mycloud === "" ? mycloud : mycloud.secure_url,content}) 
        await newPost.save()
        
           return res.status(201).send({msg:"post has been created",post:newPost})
         }else{
           return res.status(404).send('user not found')
         }
     } catch (error) {
      console.log(error); 
      return res.send(error)
     }
});



// for deleting a post

PostRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        await PostModel.findByIdAndDelete(id);
        return res.status(200).send('post has been deleted')
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

//get all posts 

PostRouter.get("/all/:id",async(req,res)=>{
    const {id} = req.params;
    let page = req.query.page || 1;
    let limit = 10;

    try {
        const allPosts = await PostModel.find({userId:id}).populate('userDetails').populate("commentDetails");
        const user = await UserModel.findOne({_id:id});
        const usersFriendsPosts=  await Promise.all(
            user.friends.map((el)=>PostModel.find({userId:el}).populate("userDetails").populate("commentDetails"))
        )
        return res.status(201).send({posts:allPosts.concat(usersFriendsPosts.flat(1)).slice((((page-1)*limit)+1),((page*limit)+1)),user:user});
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
})


// after commenting getting the data

PostRouter.get("/allposts/:id",async(req,res)=>{
    const {id} = req.params;


    try {
        const allPosts = await PostModel.find({userId:id}).populate('userDetails').populate("commentDetails");
        const user = await UserModel.findOne({_id:id});
        const usersFriendsPosts=  await Promise.all(
            user.friends.map((el)=>PostModel.find({userId:el}).populate("userDetails").populate("commentDetails"))
        )
        return res.status(201).send({posts:allPosts.concat(usersFriendsPosts.flat(1)),user:user});
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
})


//for liking a post

PostRouter.patch("/like/:id",async(req,res)=>{
    const {id} = req.params;
    const {userId} = req.body
    try {
        const post = await PostModel.findById(id);
        const allLikes = post.likes;
        if(allLikes.includes(userId)){
            allLikes.splice(allLikes.indexOf(userId),1)
            await PostModel.findByIdAndUpdate({_id:id},{likes:[...allLikes]})

        }else{
            await PostModel.findByIdAndUpdate({_id:id},{likes:[...allLikes,userId]})
        }
        const allPosts = await PostModel.find({userId:userId}).populate('userDetails');
        const user = await UserModel.findOne({_id:userId});
        const usersFriendsPosts=  await Promise.all(
            user.friends.map((el)=>PostModel.find({userId:el}).populate('userDetails'))
        )
        return res.status(201).send({posts:allPosts.concat(usersFriendsPosts.flat(1)),user:user});
        // return res.status(201).send("post has been liked")
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
})


//for commenting 

PostRouter.patch("/comment/:id",async(req,res)=>{
    const {id} = req.params;
    const {comment, userId} = req.body
    try {
    const post = await PostModel.findById(id);
    const allComments = post.comments
    const allCommentDetails = post.commentDetails
        await PostModel.findByIdAndUpdate({_id:id},{comments:[...allComments,{comment,userId}],commentDetails:[...allCommentDetails,userId]});
        // const allPosts = await PostModel.find().populate("commentDetails").populate("userDetails")
        // console.log(allPosts);
        return res.status(201).send({msg:'comment has been added to post'})
    } catch (error) {
        console.log(error);
        return res.status(404).send(error)
    }
})
module.exports = {PostRouter}

