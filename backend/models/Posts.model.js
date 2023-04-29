const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
userId:{
    type:String
},
userDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
content:String,
likes:Number,
picture:String,
comments:[{
   type:mongoose.Schema.Types.ObjectId,ref:"comment"
}]

});

const PostModel = mongoose.model("post",PostSchema);


module.exports= {PostModel};

