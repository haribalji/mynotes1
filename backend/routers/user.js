const express = require("express");
const router = express.Router();
const getuser = require("../middleware/getuser"); // Import middleware

router.get("/getuser", getuser, (req, res) => {
  res.json({ userId: req.user.id });
});

module.exports = router;
// it is used for check list