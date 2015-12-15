var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userid) {
		var basket = req.session.basket;
		if (!basket)
			basket = [];
		var queryString = "";
		for (var index in basket) {
			queryString += basket[index].no+",";
		}
		queryString = queryString.substring(0, queryString.length-1);
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select productName name, productComment comment, productPrice price from productlist where productNo in ('+queryString+') order by find_in_set(productNo, "'+queryString+'")', function(err, result, field) {
				if (err)
					console.error(err);
				req.session.total_amount = 0;
				for (var index in result) {
					req.session.total_amount += result[index].price*basket[index].count;
				}
				res.render('basket', {basket: basket, info: result, total_amount: req.session.total_amount});	
			});
	  	});
	}
  	else
  		res.redirect('/');
});

router.post('/plus', function(req, res, next) {
	req.session.basket[req.body.index]++;
	res.end();
});

module.exports = router;
