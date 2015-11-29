var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	if (req.body.id == 'vasket_admin' && req.body.pw == 'vasket20151012')
  		res.render('main');
});

module.exports = router;
