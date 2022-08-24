const { User } = require("../models");
const { hash } = require("../utils/index");

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

module.exports = {
  signup,
};
