const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
userId:{
    type:String,
},
content:String,
likes:Number,
comments:[{
   type:mongoose.Schema.Types.ObjectId,ref:"comment"
}]

});

const PostModel = mongoose.model("post",PostSchema);


module.exports= {PostModel};

