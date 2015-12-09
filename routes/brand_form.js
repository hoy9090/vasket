var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.header('Referer') && req.header('Referer').endsWith('admin_console'))
		res.render('brand_form');
	else
		res.redirect('back');
});

module.exports = router;
