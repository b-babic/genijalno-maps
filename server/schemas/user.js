const mongoose = require("mongoose"),
  validate = require("mongoose-validator");
bcrypt = require("bcryptjs");

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const emailValidator = [
  validate({
    validator: "matches",
    arguments: "/^([w-.]+@([w-]+.)+[w-]{2,4})?$/",
    message: "Please provide valid email format"
  })
];

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: "Email address is required",
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  tokens: {
    type: Array,
    default: []
  },
  last_login: {
    type: Date,
    default: Date.now()
  }
});

schema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return done(err);
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = schema;
