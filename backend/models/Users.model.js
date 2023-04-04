const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
// _id:mongoose.Schema.Types.ObjectId,
name:{
    type:String,
    lowercase:true,
    required:true
},
gender:{
    type:String,
    enum:['male','female','prefer not to say'],
    reqired:true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
},
userData:{
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}],
    likes:Number,
    Comment:Number
},
profile:{
    type:String,
    default:'https://img.freepik.com/free-icon/user_318-563642.jpg'
}
});

const UserModel = mongoose.model("user",UserSchema);


module.exports= {UserModel};

