const bcrypt = require("bcrypt-inzi");
const jwt = require("jsonwebtoken");
const config = require("../config");

const hash = async (text) => await bcrypt.stringToHash(text);

const convertHashToString = async (userPassword, stringPassword) =>
  await bcrypt.varifyHash(stringPassword, userPassword);

const jwtToken = (payload) =>
  jwt.sign(
    {
      expiresIn: 0,
      data: payload,
    },
    config.SECRET,
    {
      expiresIn: 999999999999999,
    }
  );

module.exports = {
  hash,
  convertHashToString,
  jwtToken,
};
