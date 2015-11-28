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
	if (!req.session.userid)
		res.redirect('/');
	else {
		var brandNo = req.query.brandNo;
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select brandName brand from brand where brandNo='+brandNo,
				function(err, result, field) {
				if (err) {
					console.error(err);
					return;
				}
				var brand = result[0].brand;
				connection.query('select count(*) as "like" from brandLikeList where brandNo='+brandNo+' and userNo='+req.session.userNo,
					function(err, result, field) {
						if (err) {
							console.error(err);
							return;
						}
						connection.release();
						res.render('brand', {brand: brand, like: result[0].like, brandNo: brandNo});
					});
			});
		});
	}
});

module.exports = router;
