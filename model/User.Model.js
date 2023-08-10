
const mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    number:Number,
    gender:String,
},{
    versionKey:false,
})

// const userSchema = mongoose.Schema({
//     googleId: String,
//     username: String,
//     email: String,
//     password: String,
//     gender: String,
//     number: Number
// },{
//     versionKey:false,
// });


const UserModel = mongoose.model("user",userSchema)

module.exports={UserModel}