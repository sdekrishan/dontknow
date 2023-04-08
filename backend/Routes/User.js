const express = require("express");
const UserRouter = express.Router();
const { UserModel } = require("../models/Users.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


UserRouter.get("/all",  async(req, res) => {
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
          const token = jwt.sign({project:"mywork"},"phoenix");
          res.status(200).send({"msg":"login successful","token":token,email});

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
  res.send(data)
  if(user){
    res.status(200).send(user)

  }else{
    res.status(404).send("User not found")
  }
  } catch (error) {
    res.status(404).send("something went wrong")
    console.log(error);
  }
})

//for sending friend Requests

UserRouter.patch("/follow",async(req,res)=>{
  const {userId,followId} = req.body;

  try {
  const user = await UserModel.findOne({_id:userId})  ;
  console.log(user);
  let allFriends = user.friends;
  const newUser = await UserModel.findByIdAndUpdate({_id:userId},{friends:[...allFriends,followId]});
  res.status(200).send("followed")
  } catch (error) {
    res.status(500).send("something went wrong")
  }
})

module.exports = {UserRouter}
