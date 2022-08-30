const express = require("express");
const router = express.Router();
const { user } = require("../controllers");
const config = require("../config");
const jwt = require("jsonwebtoken");

router.post("/auth/signup", user.signup);

router.post("/auth/signin", user.signin);

router.use(async (req, res, next) => {
  try {
    let accessToken = req.get("Authorization");
    if (accessToken) {
      accessToken = accessToken.slice(accessToken.indexOf(" ") + 1);
      console.log("convert", accessToken);

      const decoded = jwt.verify(accessToken, config.SECRET);

      if (decoded) {
        req.user = decoded;
        next();
      } else {
        res.status(400).send({
          error: "something went wrong",
        });
      }
    } else {
      res.status(400).send({
        error: "Not authorized request",
      });
    }
  } catch (err) {
    console.log("err", err);
    res.status(400).send({
      error: "something went wrong",
    });
  }
});

router.get("/auth/profile", user.profile);

module.exports = router;
