var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');

// index
router.get('/', function(req, res) {
  Poll.find({}, function(err, polls) {
    if (err) {console.log('Error at GET /polls');} else {
      res.render('polls/index', {polls: polls});
    }
  });
});

// show - show poll
router.get('/:id', function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {console.log('Error at GET /polls/:id');} else {
      res.render('polls/show', {poll: poll});
    }
  });
});

// update - updates vote count when voted
router.put('/:id', function(req, res) {
  if (req.body.radioButton === undefined) {
    req.flash('error', 'Please choose an option before submitting your vote.');
    return res.redirect('back');
  } else {
    Poll.findById(req.params.id, function(err, poll) {
      if (err) {console.log('Error at PUT /polls/:id');} else {
        poll.options.id(req.body.radioButton).votes++;
        poll.save(function(err) {
          if (err) {console.log('Error at PUT /polls/:id poll.save()');} else {
            req.flash('success', 'Your vote has been added!');
            res.redirect('/polls/' + req.params.id);
          }
        });
      }
    });
  }
});

module.exports = router;
