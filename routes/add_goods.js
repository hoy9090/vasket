var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

/* GET home page. */
router.get('/:productNo', function(req, res, next) {
	if (req.header("Referer") && req.header("Referer").contains("/detail")) {
		var basket = req.session.basket;
		if (!basket)
			basket = [];
		basket.push({"no": req.params.productNo, "count": 1, "sns": 0, "as": 0, "return": 0});
		res.render('basket', basket);
	} else {
		res.redirect('back');
	}
});

module.exports = router;
