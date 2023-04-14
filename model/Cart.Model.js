const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    name: String,
    price: Number,
    brand: String,
    rating: Number,
    image: String,
    type:String,
    qantity:Number,
    category:String,
    userId:String   
}, {
    versionKey: false
})

const CartModel = model('cart', cartSchema);

module.exports ={CartModel};