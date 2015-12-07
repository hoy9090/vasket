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
	pool.getConnection(function(err, connection) {
		connection.query('use vasket');
		connection.query('insert into productlist(brandNo, productPrice, productName, productComment, productState, productInven, uploadDate) values(?, ?, ?, ?, "판매중", ?, sysdate())', [req.body.brand, req.body.price, req.body.name, req.body.content, req.body.inven],
			function(err, result, field) {
				if (err) {
					console.error(err);
					return;
				}
				connection.release();
				req.body.id = 'vasket';
				req.body.pw = '20151012';
				res.redirect('/admin_console');
		});
	});
});

module.exports = router;
