const mongoose = require("mongoose");
const { DBURI } = require("../config");
const user = require("./user");
console.log("db uri is=>", DBURI);
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true });

////////////////mongodb connected disconnected events///////////////////////////////////////////////

mongoose.connection.on("connected", () => {
  // MONGODB Connected
  console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MONGODB disconnected");
  process.exit(1);
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB disconnected due to : " + err);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("App is terminating");
  mongoose.connection.close(() => {
    console.log("MONGODB disconnected");
    process.exit(0);
  });
});

module.exports = {
  user,
};
