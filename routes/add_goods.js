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
	if (req.session.userid && req.header("Referer") && req.header("Referer").contains("/detail")) {
		var productNo = parseInt(req.params.productNo);
		if (!req.session.basket || !req.session.basket.length) {
			req.session.basket = [];
			req.session.basket.push({"no": productNo, "count": 1, "sns": false, "as": false, "return": false});
		} else 
			for (var i = 0 ; i < req.session.basket.length ; i++) {
				if (req.session.basket[i].no == productNo)
					break;
				if (i == req.session.basket.length-1)
					req.session.basket.push({"no": productNo, "count": 1, "sns": false, "as": false, "return": false});
			}
		console.log(req.session.basket);
		res.redirect('/basket');
	} else {
		res.redirect('back');
	}
});

module.exports = router;
