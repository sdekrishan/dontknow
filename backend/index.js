const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { Socket } = require("socket.io");
const { UserRouter } = require("./Routes/User");
const app = express();
const mongoose = require("mongoose");
const { PostRouter } = require("./Routes/Posts");
const { authentication } = require("./middlewears/Authentication.middlewear");
const fileUpload = require('express-fileupload');
const { MessageRoute } = require("./Routes/Message");
const { ChatRoute } = require("./Routes/Chat");

mongoose.set('strictQuery', false);
app.use(express.json());
app.use(cors({ origin: true }));

app.use(fileUpload({
  useTempFiles:true
}))

app.use("/",UserRouter)
app.use("/message",MessageRoute)
app.use("/chat",ChatRoute)
app.use(authentication) // authorization middlewear
app.use("/posts",PostRouter)

const server = app.listen(8000,()=>{
  console.log('server has been started')
});


app.listen(process.env.port,()=>{
  mongoose.connect(
    process.env.MONGO,
  )
  .then(()=>console.log(`server has been connected on ${process.env.port}`))
  .catch(e=>console.log(e));
})

const io = require("socket.io")(server,{
  pingTimeout:60000,
    cors:{
      origin:"http://localhost:3000"
    }
 });

 let users = [];
 
 const addUser = (userId, socketId)=>{
  !users.some(id=> id.userId === userId ) && users.push({userId,socketId})
 }

 const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId)
 }

 const getUser = (userId) => {
  return users.find(user => user.userId === userId)
 }
io.on("connection",(socket)=>{
  console.log('socket connected');
  socket.on("adduser",(userId)=>{
    addUser(userId,socket.id)
    io.emit("getuser",users)
  })

  socket.on("sendMessage",({senderId, receiverId, text})=>{ 
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getmsg",{senderId,text})
  })

  socket.on("disconnect",()=>{
    console.log('user disconnects');
    removeUser(socket.id)
    io.emit("getuser",users)
  })
})
