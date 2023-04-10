const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name:String,
    image:String,
    email:String,
    password:String,
    gender:String,
    phoneNumber:Number
})

const AdminModel = mongoose.model("admin", adminSchema)

module.exports = {
    AdminModel
}