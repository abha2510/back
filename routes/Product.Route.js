const express = require("express")
const { ProductModel } = require("../model/Product.model")

const productRoute = express.Router()

productRoute.get("/", async (req, res) => {
    const user_id_making_req = req.body.user
    try {
        let data = await ProductModel.find({user:user_id_making_req})
        res.send(data)
    } catch (err) {
        res.send("Can't find product")
    }
})

productRoute.get("/:_id", async (req, res) => {
    const user_id_making_req = req.body.user
    const { _id } = req.params
    try {
        let data = await ProductModel.find({ user: user_id_making_req, _id })
        res.send(data)
    } catch (err) {
        res.send({ "msg": "Can't find" })
    }
})

productRoute.post("/create", async (req, res) => {
    try {
        await ProductModel.insertMany(req.body);
        res.status(201).send({ msg: "Product has been added" });
      } catch (err) {
        res.status(400).send({ message: err.message });
      }
})

// "name": "Glo Skin Beauty Dermstore Exclusive Bio-Renew EGF Cream and EGF Drops Duo",
// "price": 175.00,
// "brand": "BeautyFIX",
// "rating": 4,
// "image": "https://static.thcdn.com/images/large/webp//productimg/1600/1600/13920976-2644983786116838.jpg",
// "qantity":1,
// "type":"Dehydrated",
// "category":""
 
//   {
    // "name": "",
    // "price": "",
    // "brand": "BeautyFIX",
    // "rating": 0,
    // "image": "",
    // "qantity":1,
    // "type":"Dehydrated"
    // "category":""
//   }  

productRoute.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id

    try {
        await ProductModel.findByIdAndUpdate({ "_id": id }, payload)
        res.send({ "msg": "Product has been updated" })
    } catch (err) {
        res.send({ "msg": "Product not updated" })
    }
})

productRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id

    try {
        await ProductModel.findByIdAndDelete({ "_id": id })
        res.send({ "msg": "Product has been Deleted" })
    } catch (err) {
        res.send({ "msg": "Product not Deleted" })
    }
})

module.exports = {productRoute}