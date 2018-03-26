const auth = require("../controllers/auth");
const passportService = require("../services/passport");
const passport = require("passport");
const fs = require("fs");

const userData = require("../controllers/userData");

// use JwtStrategy
const requireAuth = passport.authenticate("jwt", { session: false });
// use LocalStrategy
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function router(app) {
  // USER DATA
  app.get("/", (req, res, next) => {
    res.send("Genijalno maps prototype running live. . .");
  });
  app.get("/api", userData.getAllData);
  // AUTH
  app.post("/signin", requireSignin, auth.signin);
  app.post("/signup", auth.signup);
};
