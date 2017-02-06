var facebookStrategy = require('passport-facebook');

module.exports = function(passport) {
  passport.use(new facebookStrategy({
    clientID: "203996266732286",
    clientSecret: "084fad7be990ca0f1935c98265de6598",
    callbackURL: "http://localhost:8080/login/callback"
  }, function( accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
