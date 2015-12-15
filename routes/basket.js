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
			connection.query('select productName name, productComment comment, productPrice price, snsPrice sns, asPrice "as", returnPrice "return" from productlist where productNo in ('+queryString+')'+(queryString.length ? (' order by find_in_set(productNo, "'+queryString+'")') : ""), function(err, result, field) {
				if (err)
					console.error(err);
				req.session.total_amount = 0;
				req.session.discount_amount = [];
				for (var index in result) {
					req.session.total_amount += result[index].price*basket[index].count;
					req.session.discount_amount.push({sns: result[index].sns*basket[index].count, as: result[index].as*basket[index].count, return: result[index].return*basket[index].count});

				}
				connection.release();
				res.render('basket', {basket: basket, info: result, discount: req.session.discount_amount, total_amount: req.session.total_amount});
			});
	  	});
	}
  	else
  		res.redirect('/');
});

router.post('/plus', function(req, res, next) {
	var index = parseInt(req.body.index);
	req.session.basket[index].count++;
	res.end();
});

router.post('/minus', function(req, res, next) {
	var index = parseInt(req.body.index);
	if (req.session.basket[index].count > 1)
		req.session.basket[index].count--;
	res.end();
});

router.post('/delete', function(req, res, next) {
	var index = parseInt(req.body.index);
	req.session.basket.splice(index, 1);
	req.session.discount_amount.splice(index, 1);
	res.end();
});

router.post('/discount', function(req, res, next) {
	var type = req.body.type;
	var index = req.body.index;
	var isDiscount = req.body.isDiscount == 'true' ? true : false; 
	req.session.basket[index][type] = isDiscount;
	res.end();
});

module.exports = router;
