var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');
var isLoggedIn = require('../middleware');

// user page
router.get('/', isLoggedIn, function(req, res) {
  Poll.find({ userID: req.user.id }, function(err, polls) {
    if (err) {console.log('Error at GET /user');} else {
      res.render('user/index', {polls: polls, displayName: req.user.displayName});
    }  
  });
});

// user new - display form to create new poll
router.get('/new', isLoggedIn, function(req, res) {
  res.render('user/new');
});

// user create - create new poll
router.post('/', isLoggedIn, function(req, res) {
  var newSurvey = {
    userID: req.user.id,
    name: req.sanitize(req.body.name),
    options: []
  };
  req.body.options.forEach(function(option) {
    if (option !== '') {
      newSurvey.options.push({
        optionName: req.sanitize(option),
        votes: 0
      });
    }
  });
  Poll.create(newSurvey, function(err, createdSurvey) {
    if (err) {console.log('Error at POST /polls');} else {
      req.flash('success', 'New Poll Created!');
      res.redirect('/user');
    }
  });
});

// user show - display user's selected poll
router.get('/:id', isLoggedIn, function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {console.log('Error at GET /user/:id');} else {
      res.render('user/show', {poll: poll});
    }
  });
});

// user edit - add option
router.put('/:id/add', isLoggedIn, function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {console.log('Error at PUT /user/:id/add');} else {
      poll.options.push({
        optionName: req.sanitize(req.body.option),
        votes: 0
      });
      poll.save(function(err) {
        if (err) {console.log('Error at PUT /user/:id/add poll.save()');} else {
          req.flash('success', 'Option has been added as an option!');
          res.redirect('/user/' + req.params.id);
        }
      });
    }
  });
});

// user edit - remove option
router.put('/:id/remove', isLoggedIn, function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {console.log('Error at PUT /user/:id/remove');} else {
      poll.options.id(req.body.radioButton).remove();
      poll.save(function(err) {
        if (err) {console.log('Error at PUT /user/:id/remove poll.save()');} else {
          req.flash('success', req.body.radioButton + ' has been removed.');
          res.redirect('/user/' + req.params.id);
        }
      });
    }
  });
});

// user destroy - delete user's selected poll
router.delete('/:id', isLoggedIn, function(req, res) {
  Poll.findByIdAndRemove(req.params.id, function(err) {
    if (err) {console.log('Error at DELETE /user/:id');} else {
      req.flash('success', 'Poll has been removed.');
      res.redirect('/user');
    }
  });
});

module.exports = router;
