const express = require("express");
const UserRouter = express.Router();
const { UserModel } = require("../models/Users.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


UserRouter.get("/all",  async(req, res) => {
  // res.send("working")
  try {
    let allusers = await UserModel.find();
    res.send('working');
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
          res.send("User has been created");
        }
      });
    }else{
      res.send("user already exist")
    }
  } 
  catch (error) {
    res.send(error);
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
          res.send({"msg":"login successful","token":token});

        }
        else{
          res.send("Wrong Credentials")
        }
      })
    }
    else{
      res.send("Please fill correct email id")
    }
  } catch (error) {
    res.send(error)
  }
})

module.exports = {UserRouter}
