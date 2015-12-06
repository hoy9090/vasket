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
	if (req.body.id == 'vasket_admin' && req.body.pw == '20151012') {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select userName name, userID id, joindate date, email from user',
				function(err, result, field) {
					if (err) {
						console.error(err);
						return;
					}
					var user = result;
					connection.query('select productName name, productNo no, brand.brandName brand, productPrice price, productInven inven, productState state, productComment comment from productlist left outer join brand on (productlist.brandNo=brand.brandNo)',
						function(err, result, field) {
							if (err) {
								console.error(err);
								return;
							}
							var product = result;
							connection.query('select partnerName name, partnerType type, partnerAddr addr, repName rep_name, repPhone rep_phone, repEmail rep_email, file from partner',
								function(err, result, field) {
									if (err) {
										console.error(err);
										return;
									}
									var partner = result;
									connection.release();
									res.render('admin_console', {user: user, product: product, partner: partner});
							});
				});
			});
		});
	} else
  		res.redirect('main');
});

module.exports = router;
