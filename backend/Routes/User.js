const express = require("express");
const UserRouter = express.Router();
const { UserModel } = require("../models/Users.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {uploadImage} = require('../middlewears/UploadImg')
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "dwkrorz1k",
  api_key: "272165627193615",
  api_secret: "BROfva11bTlvSZGy1a1eaVGbcbE"
});

UserRouter.get("/search/:id",  async(req, res) => {
  const {id} = req.params
  try {
    let allusers = await UserModel.find();
    let finalUser = allusers.filter((el) => el._id.toString()!==id)
    res.send(finalUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

UserRouter.post("/register", async (req, res) => {
  let { email, name, password, gender } = req.body;
  try {
    let checkUser =await UserModel.find({email})
    if(checkUser.length===0){
      let regexpression = "[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]{2,3}$";
      let response = email.match(regexpression);
      if(response){
        bcrypt.hash(password, 8, async (err, protected_password) => {
          if (err) {
            console.log(err);
          } else {
            let newUser = new UserModel({
              email,
              name,
              password:protected_password,
              gender
            });
            await newUser.save();
            res.status(201).send("User has been created");
          }
        });
      }
      else{
        res.status(400).send("Invalid Email")
      }
      
    }else{
      res.status(400).send("user already exist")
    }
  } 
  catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
});

//for login 

UserRouter.post("/login",async(req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await UserModel.find({email});
    if(user.length>0){
      bcrypt.compare(password,user[0].password,(err,result)=>{
        if(result){
          const token = jwt.sign({email:email,id:user[0]._id},"phoenix");
          res.status(200).send({"msg":"login successful","token":token,"details":{email,id:user[0]._id}});

        }
        else{
          res.status(400).send("Wrong Credentials")
        }
      })
    }
    else{
      res.status(400).send("Please fill correct email id")
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

//get one user detail

UserRouter.get("/:id",async(req,res)=>{
  const {id} = req.params;

  try {
  const user = await UserModel.findOne({_id:id});

  const data = await Promise.all(user.friends.map(el=>UserModel.findById(el)))
  res.send(user)
  if(user){
    res.status(200).send(data)

  }else{
    res.status(404).send("User not found")
  }
  } catch (error) {
    res.status(404).send("something went wrong")
    console.log(error);
  }
})


//for sending friend Requests

UserRouter.patch("/follow/:id",async(req,res)=>{
  const {id} = req.params
  const {followId} = req.body;

  try {
  const user = await UserModel.findOne({_id:id});
  await UserModel.findByIdAndUpdate({_id:id},{friends:[...user.friends,followId]});
  let newUser  = await UserModel.findById(id)
  res.status(200).send({msg:'follwing the people',users:newUser})
  
  } catch (error) {
    res.status(500).send("something went wrong")
  }
})

//for unfollow a friend

UserRouter.patch("/unfollow/:id",async(req,res)=>{
  const {id} = req.params;
  const {followId} = req.body
  try {
    await UserModel.findByIdAndUpdate(id,{$pull:{friends:followId}});
    await UserModel.findByIdAndUpdate(followId,{$pull:{friends:id}})

    res.send(`unfollowed successfully`)
  } catch (error) {
    
  }
})


//for clearing friends list 

UserRouter.patch("/clear/:id",async(req,res)=>{
  const {id} = req.params;

  try {
  const user = await UserModel.findByIdAndUpdate({_id:id},{friends:[]})  ;
    res.send("cleared friend list")
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})
//for updating a user

UserRouter.patch("/:id",async(req,res)=>{
  const {id} = req.params
  const {name,gender,bio} = req.body
  try {
    await UserModel.findByIdAndUpdate(id,{name,gender,bio})
    let newUser = await UserModel.findById(id)
    res.status(201).send({msg:'user has been updated',user:newUser})
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})

//for getting all unfollowed people

UserRouter.get("/unfollowed/:id",async(req,res)=>{
  const {id} = req.params;
  try {
  const allUsers = await UserModel.find();
  const friends = await UserModel.findById(id);
  let unfollowedPeople = allUsers.filter((person)=> {
    if(!friends.friends.includes(person._id) && person.email!==friends.email && !friends.sendedRequests.includes(person._id) && !friends.requests.includes(person._id) ){
    return person
  }
  
});
  res.status(200).send({unfollowedPeople})
  } catch (error) {
    console.log(error);
    res.status(404).send(error)
  }
})

//for getting single user data

UserRouter.get("/single/:id",async(req,res)=>{
  const {id} = req.params;
  try {
    const user = await UserModel.findOne({_id:id}).populate("friends").populate("requests").populate("sendedRequests");
    res.status(200).send(user)
  } catch (error) {
    console.log(error);
    res.status(404).send("something went wrong")
  }
})

//for changing user profile 

UserRouter.patch("/profile/:id",async(req,res)=>{
  const {id} = req.params;
 const img = req.files.file;

  try {
      const user = await UserModel.findById(id);
      if(user){
        const mycloud = await cloudinary.uploader.upload(img.tempFilePath);
        await UserModel.findByIdAndUpdate({_id:id},{profile:mycloud.secure_url})
        let newUser = await UserModel.findById(id);

        res.status(201).send({msg:"img updated",user:newUser})
      }else{
        res.status(404).send('user not found')
      }
  } catch (error) {
   console.log(error); 
   res.send(error)
  }
})

// for sending friend requests

UserRouter.patch("/request/:id",async(req,res)=>{
  const {id} = req.params;
  const {followId} = req.body;

  try {
    // sender - when we sending the request we push the id in sendedRequests array
    await UserModel.findByIdAndUpdate(id,{$push:{sendedRequests:followId}});

    // receiver - the id send by sender should be shown in the requests array
    await UserModel.findByIdAndUpdate(followId,{$push:{requests:id}});

    // we update the user here so that both the sender and receiver have certain id's.
    let updatedUser = await UserModel.findById(id)

    res.status(201).send({msg:"friend request has been sent",user:updatedUser})
  } catch (error) {
    console.log(error);
    res.status(404).send(error)
  }
})

// for cancelling the sending friend request

UserRouter.patch("/unrequest/:senderId",async(req,res)=>{
  const {senderId} = req.params;
  const {followId} = req.body
  try {
    await UserModel.findByIdAndUpdate(followId,{$pull:{requests:senderId}});
    await UserModel.findByIdAndUpdate(senderId,{$pull:{sendedRequests:followId}})
    res.status(200).send("friend request has been unsent")

  } catch (error) {
    console.log(error);
    res.status(404).send(error)
  }
})

// for accepting friend request

UserRouter.patch("/accept/:id",async(req,res)=>{
  const {id} =req.params;
  const {followId} = req.body;
  try {
    // for the accepting user - when we accept a friend request we pull the id from the requests array and push the same in friends array
    await UserModel.findByIdAndUpdate(id,{$pull:{requests:followId},$push:{friends:followId}})

    // for the sender - when we accept a friend request we should remove the id from the sended Requests array also
    await UserModel.findByIdAndUpdate(followId,{$push:{friends:id},$pull:{sendedRequests:id}})
    res.status(201).send(`${followId} has been approved`)
  } catch (error) {
    console.log(error);
    res.status(404).send(error)
  }
})

//for cancelling friend request i mean rejecting just like your crush rejects you

UserRouter.patch("/reject/:id",async(req,res)=>{
  const {id} = req.params;
  const {followId} = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, {$pull:{requests:followId}});
    await UserModel.findByIdAndUpdate(followId,{$pull:{sendedRequests:{id}}})
    res.status(201).send(`${followId} rejected successfully`)
  } catch (error) {
    console.log(error);
    res.status(404).send(error)
  }
})

module.exports = {UserRouter}
