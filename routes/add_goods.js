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
		console.log(req.session.basket);
		if (!req.session.basket)
			req.session.basket = [];
		req.session.basket.push({"no": parseInt(req.params.productNo), "count": 1, "sns": 0, "as": 0, "return": 0});
		console.log(req.session.basket);
		res.render('basket', {basket: req.session.basket});
	} else {
		res.redirect('back');
	}
});

module.exports = router;
