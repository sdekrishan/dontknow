const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema({
    content:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    }
})

const CommentModel = mongoose.model('comment',CommentSchema);

module.exports={CommentModel}