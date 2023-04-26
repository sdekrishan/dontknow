const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dwkrorz1k",
  api_key: "272165627193615",
  api_secret: "BROfva11bTlvSZGy1a1eaVGbcbE"
});

const opts = {
    overwrite:true,
    invalidate:true,
    resource_type:"auto"
}

const uploadImage = (img) =>{
    return new Promise ((resolve, reject)=>{
        cloudinary.uploader.upload(img,opts,(err,result)=>{
            if(result && result.secure_url){
                console.log(result);
                resolve(result.secure_url)
            }else{
                console.log(err);
                reject({msg:err.message})
            }
        })
    })
}

module.exports = {uploadImage}