var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.session.userid)
  		res.render('basket');
  	else
  		res.redirect('/');
});

module.exports = router;
