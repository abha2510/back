const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    rating: Number,
    image: String,
    type:String,
    qantity:String,
    category:String,
    userId:String      
},{
    versionKey: false,
})

const ProductModel = mongoose.model("product", productSchema)

module.exports = {ProductModel}