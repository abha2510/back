const { Router } = require("express");
const { CartModel } = require("../model/Cart.Model");
const cartRoute = Router();

cartRoute.get("/", async (req, res) => {
  const userId = req.body.user;
  try {
    const cart = await CartModel.find({ user: userId });
    res.send(cart);
  } catch (err) {
    res.send({ "msg": "No Product" });
  }
});


cartRoute.get("/usercart", async (req, res) => {
  const user_id_making_req = req.body.user
  try {
      const cart = await CartModel.find({ user: user_id_making_req })
      res.send(cart)
  } catch (err) {
      res.send({ "msg": "No Product" })
  }
})

cartRoute.post("/add", async (req, res) => {
  try {
      // Add the user's ID to the cart item before saving
      const cartItem = { ...req.body, user: req.body.user };
      const cart = new CartModel(cartItem);
      await cart.save();
      res.send({ "msg": "Product has been added to cart" });
  } catch (err) {
      res.send("Not Added");
  }
});

cartRoute.patch("/update/:id", async (req, res) => {
    const _id = req.params.id;
    const payload = req.body;
    try {
      await CartModel.findOneAndUpdate({ _id },payload);
      res.send({ msg: `Product with id:${_id} has been updated` });
    } catch (e) {
      return res.status(400).send(e.message);
    }
  });


cartRoute.delete("/delete/:id",async (req, res) => {
  const id = req.params.id

  try {  
          await CartModel.findByIdAndDelete({ "_id": id })
          res.send({ "msg": "Product has been removed from cart" })
      
  } catch (err) {
      res.send({ "msg": "Product not removed from cart" })
  }
});

module.exports = { cartRoute };

