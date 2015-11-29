var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	if (req.body.id == 'vasket_admin' && req.body.pw == 'vasket20151012') {
		req.url = 'http://vasket.co.kr/console';
  		res.render('main');
	} else
  		res.redirect('main');
});

module.exports = router;
