const jwt = require("jsonwebtoken");
require("dotenv").config();
const { BlacklistedToken } = require('../model/BlackList.Model');

const authenticate = async(req, res, next) => {
  const token = req.headers.authorization  && req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("Token not provided in the request.");
    return res.send({ msg: "Please Login" });
  }

  // Check if the token is blacklisted
  const blacklisted = await BlacklistedToken.findOne({ token: token });
  if (blacklisted) {
      console.log("Token is blacklisted.");
      return res.status(401).send({ msg: "Token is blacklisted. Please log in again." });
  }

  jwt.verify(token, process.env.key, (err, decoded) => {
    if (err) {
      console.log("JWT verification failed:", err.message);
      return res.send({ msg: "Please Login" });
    }

    if (decoded) {
      req.body.user = decoded.userID;
      next();
    } else {
      console.log("Token is valid, but decoding failed.");
      res.send({ msg: "Please Login" });
    }
  });
};


module.exports = { authenticate };

