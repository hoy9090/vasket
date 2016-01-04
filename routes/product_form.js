var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.header('Referer').endsWith('admin_console'))
		res.render('content_form');
	else
		res.end();
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.header('Referer').endsWith('admin_console'))
		res.render('product_form');
	else
		res.end();
});

module.exports = router;
