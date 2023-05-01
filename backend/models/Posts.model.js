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
likes:{
    type:Array,
},
picture:String,
commentDetails:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
}],
comments:[{
   userId:String,
   comment:String,
}]

});

const PostModel = mongoose.model("post",PostSchema);


module.exports= {PostModel};

