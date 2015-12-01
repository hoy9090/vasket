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
		console.log('pageNo: '+req.query.pageNo);
		var pageNo = req.query.pageNo ? req.query.pageNo : 1;
		var productNo = req.query.productNo;
		console.log('pageNo: '+pageNo);
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select productName, productPrice from productlist where productNo='+productNo,
				function(err, result, field) {
					var product = result;
					connection.query('select (select email from user where user.userno=comment.userno) email, content, date_format(date, "%Y-%m-%d %H:%i:%s") date from comment order by commentNo desc limit '+5*(pageNo-1)+', 5;',
						function(err, result, field) {
						if (err) {
							console.error('DB Selection error!!');
							return;
						}
						var content = result;
						connection.query('select count(*) count from comment',
							function(err, result, field) {
								if (err) {
									console.error('DB Selection error!!');
									return;
								}
								var count = result[0].count;
								console.log('DB ACCESS!!');
								connection.release();
								res.render('detail', {result: content, count: count, pageNo: req.query.pageNo, product: product, productNo: productNo});
						});
					});
				});
		});
  	}
});

module.exports = router;
