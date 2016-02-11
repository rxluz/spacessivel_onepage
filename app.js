var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');


var router = express.Router();

var app = express();
app.use(compression()); //use compression

app.use(require('prerender-node').set('prerenderToken', 'oxdXV3HhiWWvzj6thKFj'));

app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();
  }
});

var port=process.env.PORT || 3000;

var folder='builds/production/';

var os = require("os");

if (os.hostname().indexOf("local") > -1){
  var folder='builds/development/';
}

//var os = require("os");

// require("./components/server/medium.js");

console.log(folder);
// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


var oneDay = 86400000;


//app.use(express.static(path.join(__dirname, folder), {maxAge : oneDay*30 }));

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
  res.sendfile( __dirname + folder+'index.html');
});

module.exports = app;
