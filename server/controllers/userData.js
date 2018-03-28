const UserData = require("../models/userData");

const userData = {
  getAllData: (req, res, next) => {
    UserData.find({}, (err, entries) => {
      if (err) {
        return next(err);
      } else {
        res.send(entries);
      }
    });
  }
};

module.exports = userData;
