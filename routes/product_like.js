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
		if (err) {
			console.error('DB Connection error!!');
		}
		console.log('DB Service Connection Success!!');
		connection.query('use vasket');
		if (req.body.command == 'insert') {
			connection.query('insert into productLikeList(productNo, userNo) values(?, ?)', [req.body.productNo, req.session.userNo], function(err, result, field) {
				if (err)
					console.error(err);
				connection.query('select count(*) as `count` from productLikeList where productNo='+req.body.productNo, function (err, result, field) {
					res.send({count: result[0].count});
					console.log('LIKE change success!!');
					connection.release();
				});
			});
		} else if (req.body.command == 'delete') {
			connection.query('delete from productLikeList where userNo=? and productNo=?', [req.session.userNo, req.body.productNo], function(err, result, field) {
				if (err)
					console.error(err);
				connection.query('select count(*) as `count` from productLikeList where productNo='+req.body.productNo, function (err, result, field) {
					res.send({count: result[0].count});
					console.log('LIKE change success!!');
					connection.release();
				});
			});
		} else {
			connection.release();
		}
	});
});

module.exports = router;
