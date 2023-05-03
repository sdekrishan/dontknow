const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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
bio:{
type:String
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
friends:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
],
sendedRequests:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
],
profile:{
    type:String,
    default:'https://img.freepik.com/free-icon/user_318-563642.jpg'
},
requests:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]
});

const UserModel = mongoose.model("user",UserSchema);


module.exports= {UserModel};

