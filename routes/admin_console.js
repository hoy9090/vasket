var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});

/* GET home page. */
router.post('/', function(req, res, next) {
	if (req.body.id == 'vasket_admin' && req.body.pw == 'vasket20151012') {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select userName name, userID id, joindate date, email from user',
				function(err, result, field) {
					if (err) {
						console.error(err);
						return;
					}
					var user = result;
					connection.query('select productName name, productNo no, brand.brandName brand, productPrice price, productState state, productComment comment from productlist left outer join brand on (productlist.brandNo=brand.brandNo)',
						function(err, result, field) {
							if (err) {
								console.error(err);
								return;
							}
							var product = result;
							connection.release();
							res.render('admin_console', {user: user, product: product});
				});
			});
		});
	} else
  		res.redirect('main');
});

module.exports = router;
