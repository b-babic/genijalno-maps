const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/db");
// models
const User = require("../models/user");
const UserData = require("../models/userData");

// register new user route
router.post("/register", (req, res) => {
  // check if passwords sent in request are matching
  console.log(req);
  if (req.body.password !== req.body.passwordConfirm) {
    res.status(400).json({
      success: false,
      msg: "Passwords do not match."
    });
    return;
  }

  // initialize new user
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  // save new user to db
  newUser.save(err => {
    //check for error
    if (err) {
      // check for multiple errors
      if (err.errors) {
        //check name errors
        if (err.errors.name) {
          res.status(400).json({
            success: false,
            msg: err.errors.name.message
          });
          return;
        } // name error

        //check email errors
        if (err.errors.email) {
          res.status(400).json({
            success: false,
            msg: err.errors.email.message
          });
          return;
        } // email error

        // check username errors
        if (err.errors.username) {
          res.status(400).json({
            success: false,
            msg: err.errors.email.message
          });
          return;
        } // username errors

        // check password errors
        if (err.errors.password) {
          res.status(400).json({
            success: false,
            msg: err.errors.password.message
          });
          return;
        } // password errors

        // Show failed if everything else fails for some reasons
        res.status(400).json({
          success: false,
          msg: "Failed to register."
        });
      } // errors
    } else {
      // if no errors save the user
      res.json({
        success: true,
        msg: "User successfully registered."
      });
    }
  }); // save
}); // post register

// login existing user route
router.post("/login", (req, res) => {
  // get username and email required for login form
  const username = req.body.username;
  const password = req.body.password;

  // check if user exists in db
  User.findOne(
    {
      username: username
    },
    (err, user) => {
      if (err) {
        throw err;
      } // error check

      // if user dont exist
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "User not found!"
        });
      } // check user

      // if user exists use bcrypt for password comparison
      bcrypt.compare(password, user.password, function(err, isMatch) {
        // passwords err
        if (err) {
          throw err;
        } // err

        //no errors, pws are matched
        if (isMatch) {
          // generate jwt token
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // jwt expire in 1 week
          }); // token

          // return user object back without pw
          return res.json({
            success: true,
            token: "JWT " + token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              username: user.username
            } // user object
          }); // return user
        } else {
          // match
          return res.status(400).json({
            success: false,
            msg: "Wrong password."
          });
        } // wrong password
      }); // compare pw
    }
  ); // find user
}); // post login

// dummy profile check
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      user: req.user
    });
  }
);

router.get("/data", (req, res) => {
  // get usersData
  UserData.find({}, (err, entries) => {
    if (err) {
      return next(err);
    } else {
      res.send(entries);
    }
  });
});

// export router
module.exports = router;
