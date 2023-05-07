const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
conversationId:{
    type:String
},
senderId:{
    type:String
},
text:{
    type:String 
}
},{timestamps:true});

const MessageModel = mongoose.model("message",MessageSchema);


module.exports= {MessageModel};

