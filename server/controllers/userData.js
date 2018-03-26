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
  },
  getDataById: (req, res, next) => {
    const id = req.params._id;
    UserData.findOne({ _id: id }, (err, entry) => {
      if (err) {
        return next(err);
      } else {
        res.send(entry);
      }
    });
  }
};

module.exports = userData;
