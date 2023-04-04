const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,ref:'User'
},
content:{
    picture:String,
    content:String,
},
likes:Number,
comments:[{
   type:mongoose.Schema.Types.ObjectId,ref:"Comment"
}]

});

const PostModel = mongoose.model("post",PostSchema);


module.exports= {PostModel};

