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
			queryString += basket[index]+",";
		}
		queryString = queryString.substring(0, queryString.length-1);
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select productName name, productComment comment, productPrice price from productlist where productNo in ('+queryString+') order by find_in_set(productNo, `'+queryString+'`)', function(err, result, field) {
				if (err)
					console.error(err);
				res.render('basket', {basket: basket, info: result});	
			});
	  	});
	}
  	else
  		res.redirect('/');
});

module.exports = router;
