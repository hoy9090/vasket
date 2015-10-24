var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.locals.loggedIn = req.session.userid ? true : false;
  console.log(req.session.userid);
  console.log(res.locals.loggedIn);
  res.render('main');
});

module.exports = router;
