var facebookStrategy = require('passport-facebook');
require('dotenv').config();

module.exports = function(passport) {
  passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACKURL
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
