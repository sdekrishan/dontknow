const express = require("express");
const cors = require("cors");
const { Socket } = require("socket.io");
const { UserRouter } = require("./Routes/User");
const { connection } = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.use("/user",UserRouter)
// const server = app.listen(8000,()=>{
//   console.log('server has been started')
// });
app.listen(8000,async()=>{
  try {
    await connection;
    console.log('server has been started');
  } catch (error) {
    console.log(error);
  }
})
// const io = require("socket.io")(server,{
//   pingTimeout:60000,
//     cors:{
//       origin:"http://localhost:3000"
//     }
//  });
// io.on("connection",(socket)=>{
//   console.log('connected to socket');
//   socket.on('setup',(userdata)=>{
//     socket.join(userdata);
//     socket.emit('connected')
//   })
// })
