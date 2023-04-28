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

UserRouter.get("/search",  async(req, res) => {
  // res.send("working")
  try {
    let allusers = await UserModel.find();
    res.send(allusers);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

UserRouter.post("/register", async (req, res) => {
  let { email, name, password, gender } = req.body;
  console.log(email,name,password);
  try {
    let checkUser =await UserModel.find({email})
    console.log(checkUser);
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
    const user = await UserModel.findById(id);
    const newFriends = user.friends.filter((el)=> el!== followId )
    console.log("newFriends list ",newFriends);
    await UserModel.findByIdAndUpdate({_id:id},{friends:newFriends});

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
  const {name,gender} = req.body
  try {
    await UserModel.findByIdAndUpdate({_id:id},{name,gender})
    res.send("user has been updated")
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})

//for getting all unfollowed people

UserRouter.get("/unfollowed/:id",async(req,res)=>{
  const {id} = req.params
  try {
  const allUsers = await UserModel.find();
  const friends = await UserModel.findById(id);
  let unfollowedPeople = allUsers.filter((person)=> {
    if(!friends.friends.includes(person._id) && person.email!==friends.email ){
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
  const user = await UserModel.findOne({_id:id});
    res.status(200).send(user)
  } catch (error) {
    res.status(404).send("something went wrong")
    console.log(error);
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


module.exports = {UserRouter}
