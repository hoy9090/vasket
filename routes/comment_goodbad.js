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
		if (req.body.command == 'good') {
			connection.query('insert into productCommentGoodBad(commentNo, userNo, isGood) values(?, ?, 1)', [req.body.commentNo, req.session.userNo], function(err, result, field) {
				if (err) {
					console.error(err);
					connection.release();
					res.send({result: 'error'});
				} else {
					connection.query('select good, bad from productComment where commentNo='+req.body.commentNo, function (err, result, field) {
						res.send({result: 'success', good: result[0].good, bad: result[0].bad});
						connection.release();
					});
				}
			});
		} else if (req.body.command == 'bad') {
			connection.query('insert into productCommentGoodBad(commentNo, userNo, isGood) values(?, ?, 0)', [req.body.commentNo, req.session.userNo], function(err, result, field) {
				if (err) {
					console.error(err);
					connection.release();
					res.send({result: 'error'});
				} else {
					connection.query('select good, bad from productComment where commentNo='+req.body.commentNo, function (err, result, field) {
						res.send({result: 'success', good: result[0].good, bad: result[0].bad});
						connection.release();
					});
				}
			});
		} else {
			connection.release();
			res.end();
		}
	});
});

module.exports = router;
