const MessageRoute = require("express").Router();

const {MessageModel} = require("../models/Message.model")

// for posting a message

MessageRoute.post("/",async(req,res)=>{
    const {senderId, conversationId, text} = req.body
    try {
        const newMessage = new MessageModel({senderId,conversationId,text});
        await newMessage.save();
        res.status(200).send(newMessage)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// for getting all messages related to a particular user

MessageRoute.get("/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const messages = await MessageModel.find({conversationId:id});
        res.status(201).send(messages)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

module.exports = {MessageRoute}