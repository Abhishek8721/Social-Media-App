const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
   password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/abhishek8721/image/upload/v1661410688/1246351_ufvibk.png"
    }
})
mongoose.model("User",userSchema)