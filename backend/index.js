const express = require("express");
const cors = require("cors");
const { Socket } = require("socket.io");
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  return res.json({ username: username, secret: "sha256..." });
});

const server = app.listen(3001,()=>{
  console.log('server has been started')
});

const io = require("socket.io")(server,{
  pingTimeout:60000,
    cors:{
      origin:"https://localhost:3000/"
    }
 });

