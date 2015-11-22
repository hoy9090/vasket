var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userNo) {
		res.render('inquiry');
	} else {
		res.redirect('/');
	}
});

module.exports = router;
