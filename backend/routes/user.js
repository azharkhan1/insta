const express = require("express");
const router = express.Router();
const { user } = require("../controllers");

router.get("/auth/signup", user.signup);

router.get("/users", (req, res, next) => {
  console.log("withoutid");
  res.send("users gotten successfully");
});

module.exports = router;
