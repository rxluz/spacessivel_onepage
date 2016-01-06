var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = express.Router();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.locals.appdata = require('./data.json');
app.use('/', router);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


var express = require('express');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile( __dirname + '/public/index.html');
});


/* GET home page. */
router.get('*', function(req, res) {
  res.sendfile( __dirname + '/public/404.html');
});


module.exports = app;
