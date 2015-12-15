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
		console.log(1);
		if (!basket)
			basket = [];
		console.log(2);
		var queryString = "";
		console.log(3);
		for (var index in basket) {
			queryString += basket[index].no+",";
		}
		console.log(4);
		queryString = queryString.substring(0, queryString.length-1);
		console.log(5);
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select productName name, productComment comment, productPrice price from productlist where productNo in ('+queryString+') order by find_in_set(productNo, "'+queryString+'")', function(err, result, field) {
				if (err)
					console.error(err);
				console.log(6);
				req.session.total_amount = 0;
				console.log(7);
				for (var index in result) {
					req.session.total_amount += result[index].price*basket[index].count;
				}
				console.log(8);
				res.render('basket', {basket: basket, info: result, total_amount: req.session.total_amount});	
			});
	  	});
	}
  	else
  		res.redirect('/');
});

router.post('/plus', function(req, res, next) {
	req.session.basket[parseInt(req.body.index)].count++;
	res.end();
});

router.post('/minus', function(req, res, next) {
	var index = parseInt(req.body.index);
	if (req.session.basket[index].count > 1)
		req.session.basket[index].count--;
	res.end();
});

module.exports = router;
