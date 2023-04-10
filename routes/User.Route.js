const express= require("express");
const jwt =require("jsonwebtoken");
const bcrypt= require("bcrypt");
const { UserModel } = require("../model/User.Model");
const { authenticate } = require("../middleware/authenticate.middleware");
require("dotenv").config()
const userRoute=express.Router();

userRoute.get("/", async (req, res) => {
  try {
    let user = await UserModel.find();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong"});
  }
});

 userRoute.post("/register",async(req,res)=>{
  const { username,gender, email, password, number } = req.body
  try {
      const user = await UserModel.find({ email })
      if (user.length > 0) {
          res.send({ "msg": "Already have an account please login" })

      } else {
          bcrypt.hash(password, 9, async (err, hash) => {
              if (err) {
                  res.send("Something went wrong")
              } else {
                  const user = new UserModel({ username, email, password: hash,gender, number })
                  await user.save()
                  res.send({ "msg": "new user has been register" })
              }
          });
      }

  } catch (err) {
      res.send({ "msg": "Can't register" ,error:err.message})
  }
 })

 userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
          const user = await UserModel.find({email})
          if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                let token = jwt.sign({userID:user[0]._id},process.env.key)  
                res.send({"msg":"Login Successful",token:token})  ;
                }else{
                    res.send({"msg":"Wrong Credentials"})
                }
            });
          } else{
            res.send({"msg":"Wrong Credentials"})
          }
    } catch (err) {
        res.send ({"msg":"Something went wrong",error:err.message})
    }
 })

 userRoute.patch('/forgot-password/', async (req, res) => {
    const { email, password } = req.body
    const data = await UserModel.find({ email })
    if (data.length > 0) {
      try {
        bcrypt.hash(password, 5, async (err, hash) => {
          if (err) res.send({ msg: "Something went wrong", error: err.message });
          else {
            await UserModel.findOneAndUpdate({ email }, { password:hash })
            res.status(201).send({ msg: "Password is Updated" })
           
          }
        });
      } catch (error) {
        res.send({ msg: "Email is not registered.", error: error.message });
      }
    }
    else {
      res.send({ msg: "Email is not registered." })
    }
  })
 module.exports={userRoute}

