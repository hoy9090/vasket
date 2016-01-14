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
var inquiry_do = require('./routes/inquiry_do');
var inquiry_detail = require('./routes/inquiry_detail');
var brand = require('./routes/brand');
var admin = require('./routes/admin');
var admin_console = require('./routes/admin_console');
var contact_info = require('./routes/contact_info');
var reg_partner = require('./routes/reg_partner');
var product_form = require('./routes/product_form');
var content_form = require('./routes/content_form');
var brand_form = require('./routes/brand_form');
var reg_product = require('./routes/reg_product');
var files = require('./routes/files');
var reg_brand = require('./routes/reg_brand');
var community_post = require('./routes/community_post');
var add_goods = require('./routes/add_goods');
var enroll_code = require('./routes/enroll_code');
var user_settings = require('./routes/user_settings');
var reg_code = require('./routes/reg_code');
var community_box = require('./routes/community_box');
var reg_community = require('./routes/reg_community');
var community_like = require('./routes/community_like');
var my_activity = require('./routes/my_activity');
var product_box = require('./routes/product_box');
var reg_comm_comment = require('./routes/reg_comm_comment');
var reg_content = require('./routes/reg_content');
var reg_cont_comment = require('./routes/reg_cont_comment');
var content_box = require('./routes/content_box');
var content_like = require('./routes/content_like');
var content_clip = require('./routes/content_clip');
var product_like = require('./routes/product_like');
var reg_prod_comment = require('./routes/reg_prod_comment');
var product_clip = require('./routes/product_clip');
var comment_goodbad = require('./routes/comment_goodbad');
var privacy_policy = require('./routes/privacy_policy');
var product_box_moreComment = require('./routes/product_box_moreComment');

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
app.set('env', 'production');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({uploadDir: path.join(__dirname, '/tmp'), extended: false}));
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
app.use('/inquiry_do', inquiry_do);
app.use('/inquiry_detail', inquiry_detail);
app.use('/brand', brand);
app.use('/admin', admin);
app.use('/admin_console', admin_console);
app.use('/contact_info', contact_info);
app.use('/reg_partner', reg_partner);
app.use('/product_form', product_form);
app.use('/content_form', content_form);
app.use('/brand_form', brand_form);
app.use('/reg_product', reg_product);
app.use('/files', files);
app.use('/reg_brand', reg_brand);
app.use('/community_post', community_post);
app.use('/add_goods', add_goods);
app.use('/enroll_code', enroll_code);
app.use('/user_settings', user_settings);
app.use('/reg_code', reg_code);
app.use('/community_box', community_box);
app.use('/reg_community', reg_community);
app.use('/community_like', community_like);
app.use('/my_activity', my_activity);
app.use('/product_box', product_box);
app.use('/reg_comm_comment', reg_comm_comment);
app.use('/reg_content', reg_content);
app.use('/reg_cont_comment', reg_cont_comment);
app.use('/content_box', content_box);
app.use('/content_like', content_like);
app.use('/content_clip', content_clip);
app.use('/product_like', product_like);
app.use('/reg_prod_comment', reg_prod_comment);
app.use('/product_clip', product_clip);
app.use('/comment_goodbad', comment_goodbad);
app.use('/privacy_policy', privacy_policy);
app.use('/product_box_moreComment', product_box_moreComment);

app.get('/download/:id', function(req, res) {
  var filename = req.params.id;
  var filepath = path.join(__dirname, '/download/', filename);
  res.download(filepath);
});

app.get('/download/mail/:id', function(req, res) {
  var filename = req.params.id;
  var filepath = path.join(__dirname, '/download/mail/', filename);
  res.download(filepath);
});

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
