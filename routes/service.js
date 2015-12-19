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
						var product = result;
						connection.query('select email, brandName, brandImageName, image, view, community.content from community join user on community.userNo = user.userNo join brand on community.brandNo = brand.brandNo', function(err, result, field) {
							if (err) {
								console.error(err);
								return;
							}
							for (var index in result) {
								var at_index = result[index].email.indexOf('@');
								result[index].email = result[index].email.substr(0, 2)+'***@'+result[index].email.substr(at_index+1, 2);
							}
							connection.release();
							res.render('service', {brand: brand, brandLike: brandLike, product: product, community: result});
						});	
					});
				});
			});
		});
	} else {
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
				connection.query('select productNo, productName, productPrice from productlist', function(err, result, field) {
					if (err) {
						console.error(err);
						return;
					}
					var product = result;
					connection.query('select email, brandName, brandImageName, image, view, community.content from community join user on community.userNo = user.userNo join brand on community.brandNo = brand.brandNo', function(err, result, field) {
						if (err) {
							console.error(err);
							return;
						}
						for (var index in result) {
							var at_index = result[index].email.indexOf('@');
							result[index].email = result[index].email.substr(0, 2)+'***@'+result[index].email.substr(at_index+1, 2);
						}
						connection.release();
						res.render('service', {brand: brand, brandLike: 0, product: product, community: result});
					});	
				});
			});
		});
	}
});

module.exports = router;
