var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var signup = require('./routes/signup');
var fb_login = require('./routes/fb_login');
var signup_insert = require('./routes/signup_insert');
var signup_finish = require('./routes/signup_finish');
var mypage = require('./routes/mypage');
var detail = require('./routes/detail');
var payment = require('./routes/payment');
var reg_comment = require('./routes/reg_comment');
var customer = require('./routes/customer');
var goods = require('./routes/goods');
var goodsDetail = require('./routes/goodsDetail');
var basket = require('./routes/basket');
var pay_finish = require('./routes/pay_finish');
var service = require('./routes/service');
var brand_like = require('./routes/brand_like');
var inquiry = require('./routes/inquiry');
var inquiry_insert = require('./routes/inquiry_insert');

var options = {
  key: fs.readFileSync('./ssl/ssl.key'),
  cert: fs.readFileSync('./ssl/ssl.crt'),
  passphrase: "121314asdf"
};

var app = express();

// view engine setup
app.set('port1', 80);
app.set('port2', 443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.locals.loggedIn = req.session.userid ? true : false;
  next();
});

app.use('/', routes);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/fb_login', fb_login);
app.use('/signup_insert', signup_insert);
app.use('/signup_finish', signup_finish);
app.use('/mypage', mypage);
app.use('/detail', detail);
app.use('/payment', payment);
app.use('/reg_comment', reg_comment);
app.use('/customer', customer);
app.use('/goods', goods);
app.use('/goodsDetail', goodsDetail);
app.use('/basket', basket);
app.use('/pay_finish', pay_finish);
app.use('/service', service);
app.use('/brand_like', brand_like);
app.use('/inquiry', inquiry);
app.use('/inquiry_insert', inquiry_insert);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

http.createServer(app).listen(app.get('port1'), function(){
  console.log('Express http server listening on port ' + app.get('port1'));
});
https.createServer(options, app).listen(app.get('port2'), function(){
  console.log('Express https server listening on port ' + app.get('port2'));
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
