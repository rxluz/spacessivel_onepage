var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = express.Router();

var app = express();
var port=process.env.PORT || 3000;

var folder='builds/production/';

var os = require("os");

if (os.hostname().indexOf("local") > -1){
  var folder='builds/development/';
}

//var os = require("os");

//require("./components/server/medium.js");

console.log(folder);
// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, folder)));

///app.locals.appdata = require('./data.json');
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
  res.sendfile( __dirname + folder+'index.html');
});


/* GET home page. */
router.get('*', function(req, res) {
  res.sendfile( __dirname + folder+'404.html');
});

module.exports = app;
