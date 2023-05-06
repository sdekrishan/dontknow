const ChatRoute = require("express").Router();

const {ChatModel} = require("../models/Chat.model")


//post a new Chat
ChatRoute.post("/",async(req,res)=>{
    const {senderId,receiverId} = req.body
    try {
        const newChat = new ChatModel({members:[senderId,receiverId]})
        await newChat.save();
        res.status(201).send(newChat)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

//get a new Chat

ChatRoute.get("/single/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const sendChat = await ChatModel.find({members:{$in:[id]}});
        res.status(200).send(sendChat)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// getting a chat related to both user

ChatRoute.get("/getchat/:id/:senderId",async(req,res)=>{
    try {
        const userChat = await ChatModel.find({members:{$all:[req.params.id,req.params.senderId]}})
        res.status(200).send({userChat,already:userChat.length>0 ? true : false})
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})
module.exports = {ChatRoute}