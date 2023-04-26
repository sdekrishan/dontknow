const express = require("express");
const {PostModel} = require("../models/Posts.model");
const { UserModel } = require("../models/Users.model");
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "dwkrorz1k",
  api_key: "272165627193615",
  api_secret: "BROfva11bTlvSZGy1a1eaVGbcbE"
});



const PostRouter = express.Router();


//for getting all the posts related to a particular user
PostRouter.get("/:id",async(req,res)=>{
    // const {id} =  req.body;
    const {id} = req.params
    
    try {
        let allPosts = await PostModel.find({userId:id});
        res.send(allPosts);
    } catch (error) {
        console.log(error);
        res.status(404).send("something went wrong. Please try again after some time.");
    }
})

PostRouter.post("/create/:id",async(req,res)=>{
    const {content} = req.body;

    // try {   
    //     const post = new PostModel({userId,content});
    //     await post.save();
    //     const user = await UserModel.find({_id:userId});
    //     const userPosts=  user[0].posts;
    //     await UserModel.findByIdAndUpdate({_id:userId},{posts:[...userPosts,post._id]})
    //     res.send("post added successfully")
    // } catch (error) {
    //     console.log(error);
    // }
    const {id} = req.params;
    const img = req.files.file;
    console.log(img);
   
     try {
         const user = await UserModel.findById(id);
         if(user){
           const mycloud = await cloudinary.uploader.upload(img.tempFilePath);
        //    await UserModel.findByIdAndUpdate({_id:id},{profile:mycloud.secure_url})
        await PostModel.create({userId:id,picture:mycloud.secure_url,content})
        //    let newUser = await UserModel.findById(id);
   
           res.status(201).send({msg:"post has been created"})
         }else{
           res.status(404).send('user not found')
         }
     } catch (error) {
      console.log(error); 
      res.send(error)
     }
});

//get all posts 

PostRouter.get("/all/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const allPosts = await PostModel.find({userId:id});
        const user = await UserModel.findOne({_id:id});
        console.log(user);
        const usersFriendsPosts=  await Promise.all(
            user.friends.map((el)=>PostModel.find({userId:el}))
        )
        console.log(allPosts,usersFriendsPosts);
        res.status(201).send({posts:allPosts.concat(usersFriendsPosts.flat(1)),user:user});
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})

module.exports = {PostRouter}

