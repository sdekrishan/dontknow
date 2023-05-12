const express = require("express");
require('dotenv').config()
const cors = require("cors");
const app = express();

app.use(cors({ origin: true }));

const server = app.listen(8000,()=>{
  console.log('server has been started')
});


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
