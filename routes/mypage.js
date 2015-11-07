var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.id === '')
		res.render('main');
  res.render('mypage', {email: req.session.email});
});

module.exports = router;
