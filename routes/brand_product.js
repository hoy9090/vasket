var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('brand_product');
});

module.exports = router;