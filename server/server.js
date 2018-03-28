const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  cors = require("cors"),
  database = require("./options/config").db;

// initialize mongoose (deprecation warningu sing regular Promise, using bluebird instead);
mongoose.Promise = require('bluebird');
mongoose.connect(database, {server: { poolSize: 5 }});
const conn = mongoose.connection;

conn.once('open', function ()
{
    console.log("Mongoose connection opened.")
});

// Initialize express and set up routes
const app = express();

const port = require("./options/config").port,
  apiRoutes = require("./routes/api");

app.use(cors());
app.use(morgan("dev"));
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`App up at ${port}!`);
});
