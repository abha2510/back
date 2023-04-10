const express=require("express");
require("dotenv").config();
const {connection}=require("./config/db");
const {authenticate} =require("./middleware/authenticate.middleware")
const {productRoute}=require("./routes/Product.Route");
const {userRoute}=require("./routes/User.Route");
const {cartRoute}=require("./routes/Cart.Route");
const {wishlistRoute}=require("./routes/Wishlist.Route")
const cors=require("cors");
const { adminRoute } = require("./routes/Admin.Route");
const { UserModel } = require("./model/User.Model");
const app=express();

app.use(express.json());
app.use(cors());

app.get("/data", async (req, res) => {
    const { q, limit, skip, sort, order, brand, uses } = req.query

    const query = { name: { $regex: q, $options: "i" } }
    let x;
    if (q == undefined && brand == undefined && uses == undefined) {
        x = {}
    }
    else if (q !== undefined) {
        x = query
    }
    else if (q === undefined && brand !== undefined && uses === undefined) {
        x = { brand }
    }
    else if (q !== undefined && brand === undefined && uses === undefined) {
        x = query
    }

    let y = {}
    if (sort == 'brand') {
        y = { brand: order }
    }
    else if (sort == 'rating') {
        y = { rating: order }
    }
    else if (sort == 'price') {
        y = { price: order }
    }
    else if (sort == 'name') {
        y = { name: order }
    }


    try {
        const data = await productModel.find(x).sort(y).limit(limit).skip(skip)
        res.send(data)
    }
    catch (err) {
        res.send("Can't get Data")
        console.log(err)
    }

})


app.get("/data/:_id", async (req, res) => {
    const { _id } = req.params
    try {
        const data = await productModel.find({ _id })
        res.send(data)
    } catch (err) {
        res.send({ "msg": "Can't find" })
    }
})


app.use("/users", userRoute);
app.use("/admins", adminRoute)
app.get("/usersdata", async (req, res) => {
    try {
        let users = await UserModel.find()
        res.send(users)
    } catch (err) {
        res.send({ "msg": "Users not found" })
    }
})
app.use("/products",productRoute);
app.use(authenticate)
app.use("/carts",cartRoute);
app.use("/wishlists",wishlistRoute)



app.listen(process.env.port,async()=>{
    try {       
        await connection
        console.log("Connected yo DB!!");
    } catch (error) {
        console.log(error.message);
    }
   console.log(`sever running at port ${process.env.port}`)
})
