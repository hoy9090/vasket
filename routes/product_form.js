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
	if (req.header('Referer') && req.header('Referer').endsWith('admin_console'))
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select brandNo, brandName from brand',
				function(err, result, field) {
					if (err) {
						console.error(err);
						return;
					}
					var brand = result;
					
					connection.release();
					res.render('product_form', {brand: brand});
			});
		});
	else
		res.end();
});

module.exports = router;
