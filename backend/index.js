const express = require("express");
const cors = require("cors");
const { Socket } = require("socket.io");
const app = express();

app.use(express.json());
// app.use(cors({ origin: true }));


const server = app.listen(5000,()=>{
  console.log('server has been started')
});

const io = require("socket.io")(server,{
  pingTimeout:60000,
    cors:{
      origin:"http://localhost:3000"
    }
 });
io.on("connection",(socket)=>{
  console.log('connected to socket');
  socket.on('setup',(userdata)=>{
    socket.join(userdata);
    socket.emit('connected')
  })
})
