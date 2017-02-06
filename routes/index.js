var express = require('express');
var router = express.Router();
var passport = require('passport');
var Poll = require('../models/poll');

// home page
router.get('/', function(req, res) {
  res.redirect('/polls');
});

// authentication
router.get('/login', passport.authenticate('facebook'));
router.get('/login/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/user');
});

module.exports = router;
