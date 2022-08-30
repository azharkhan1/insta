const { User } = require("../models");
const { hash, convertHashToString, jwtToken } = require("../utils/index");

const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json(`
        Please send following in json body: i.e
        name 
        password
        email
      `);
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        error: "User already exists",
      });
    }
    const passwordToHash = await hash(password);

    const newUser = new User({
      name,
      email,
      password: passwordToHash,
    });

    await newUser.save();

    res.status(200).json({
      message: "User signed up successfully",
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ error: "Something went wrong" });
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(`
        Please send following in json body: i.e
        password
        email
      `);
    }

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).send({
        error: "User email or password does not matchh",
      });
    }

    const hashToStringPass = await convertHashToString(user.password, password);

    if (hashToStringPass) {
      const token = jwtToken(user);
      return res.status(200).send({
        message: "Signed in successfully",
        user,
        token,
      });
    }

    return res.status(400).send({
      error: "User email or password does not match",
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).send({
      error: "Something went wrong",
    });
  }
};

const profile = async (req, res) => {
  try {
    return res.send({ message: "usser gotten successfully", user: req.user });
  } catch (err) {
    console.log("err", err);
    res.status(400).send({
      error: "Something went wrong",
    });
  }
};

module.exports = {
  signup,
  signin,
  profile,
};
