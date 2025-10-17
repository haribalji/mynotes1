const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model
const jwt = require("jsonwebtoken");
const JWT_SECERT = process.env.JWT_SECERT;
// const JWT_SECERT="haribalajinvp";
console.log(JWT_SECERT);
// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
    // console.log(JWT_SECERT);


    // first this middleware  will be exectuted then  it will be to next middlewarenfor the execution if token is of  invalid admin user
    // then it will not allow to acess the data
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECERT);
    if (!decoded.isAdmin) return res.status(403).json({ message: "Forbidden: Admins only" });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
// Route to get all users
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "name email"); // Fetch only name & email
    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;