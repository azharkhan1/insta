const bcrypt = require("bcrypt-inzi");

const hash = async (text) => await bcrypt.stringToHash(text);

module.exports = {
  hash,
};
