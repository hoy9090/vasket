var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next) {
  res.render('signup', req.body);
});

module.exports = router;
