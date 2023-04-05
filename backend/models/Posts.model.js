const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,ref:'user'
},
content:{
    picture:String,
    content:String,
},
likes:Number,
comments:[{
   type:mongoose.Schema.Types.ObjectId,ref:"comment"
}]

});

const PostModel = mongoose.model("post",PostSchema);


module.exports= {PostModel};

