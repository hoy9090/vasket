var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'vasket1012'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userNo) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('DB Connection error!!');
				return;
			}
			console.log('DB Service Connection Success!!');
			connection.query('use vasket');
			connection.query('select brandNo, brandName, brandContent, brandImageName image from brand', function(err, result, field) {
				if (err) {
					console.error(err);
					return;
				}
				var brand = result;
				connection.query('select brandNo from brandLikeList where userNo=?', [req.session.userNo], function(err, result, field) {
					if (err) {
						console.error(err);
						return;
					}
					var brandLike = result;
					connection.query('select productNo, productName, productPrice from productlist', function(err, result, field) {
						if (err) {
							console.error(err);
							return;
						}
						connection.release();
						res.render('service', {brand: brand, brandLike: brandLike, product: result});	
					});
				});
			});
		});
	} else {
		res.redirect('/');
	}
});

module.exports = router;
