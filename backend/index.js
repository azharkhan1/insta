const express = require("express");
const { PORT } = require("./config");
const { user } = require("./routes");
require("./models");

const app = express();

app.use(express.json());

app.use(user);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
