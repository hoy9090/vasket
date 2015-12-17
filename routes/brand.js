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
	var brandNo = req.query.brandNo;
	if (!req.session.userid) {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select brandName brand, brandImageName image from brand where brandNo='+brandNo,
				function(err, result, field) {
				if (err) {
					console.error(err);
					return;
				}
				var brand = result[0].brand;
				var image = result[0].image;
				
				connection.release();
				res.render('brand', {brand: brand, like: -1, brandNo: brandNo, image: image});
			});
		});
		res.redirect('/');
	} else {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select brandName brand, brandImageName image from brand where brandNo='+brandNo,
				function(err, result, field) {
				if (err) {
					console.error(err);
					return;
				}
				var brand = result[0].brand;
				var image = result[0].image;
				connection.query('select count(*) as "like" from brandLikeList where brandNo='+brandNo+' and userNo='+req.session.userNo,
					function(err, result, field) {
						if (err) {
							console.error(err);
							return;
						}
						connection.release();
						res.render('brand', {brand: brand, like: result[0].like, brandNo: brandNo, image: image});
					});
			});
		});
	}
});

module.exports = router;
