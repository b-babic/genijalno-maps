const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  cors = require("cors"),
  database = require("./options/config").db;

mongoose.connect(database);
mongoose.Promise = global.Promise;
const app = express(),
  db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB.");
});

const port = require("./options/config").port,
  apiRoutes = require("./routes/api");

app.use(cors());
app.use(morgan("dev"));
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`App up at ${port}!`);
});
