var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.session.userid)
		res.redirect('/');
	else
  		res.render('mypage', {email: req.session.email});
});

module.exports = router;
