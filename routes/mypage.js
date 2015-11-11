var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.session.userid)
		res.render('main');
	else
  		res.render('mypage', {email: req.session.email});
});

module.exports = router;
