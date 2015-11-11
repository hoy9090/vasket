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
		res.render('main');
	else {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select (select email from user where user.userno=comment.userno) email, content from comment order by commentNo desc',
				function(err, result, field) {
				if (err) {
					console.error('DB Selection error!!');
					return;
				}
				for (var val in result) {
					console.log(val.email, val.content);
				}
				connection.release();
				res.render('detail', result);
			});
		});
  	}
});

router.post('/', function(req, res, next) {
  if (!req.session.userid)
		res.render('main');
	else {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select (select email from user where user.userno=comment.userno) email, content from comment order by commentNo desc',
				function(err, result, field) {
				if (err) {
					console.error('DB Selection error!!');
					return;
				}
				for (var val in result) {
					console.log(val.email, val.content);
				}
				connection.release();
				res.render('detail', result);
			});
		});
  	}
});

module.exports = router;
