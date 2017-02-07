/***********
DEPENDENCIES
***********/
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var facebookStrategy = require('passport-facebook');
var expressSanitizer = require('express-sanitizer');
var flash = require('connect-flash');
var Poll = require('./models/poll');
require('dotenv').config();

/*****
SET-UP
*****/
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.use(flash());

app.use(require('express-session')({
  secret: 'Call me Ishmael',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

/*******
DATABASE
*******/
var connectionString = process.env.MONGO_DB;
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', function(){
    console.log('There was an error connecting to the database');
});
db.once('open', function() {
    console.log('Successfully connected to database');
});

/*****
ROUTES
*****/
var indexRoutes = require('./routes/index');
var pollRoutes = require('./routes/polls');
var userRoutes = require('./routes/user');
app.use('/', indexRoutes);
app.use('/polls', pollRoutes);
app.use('/user', userRoutes);

// listen for connections
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
