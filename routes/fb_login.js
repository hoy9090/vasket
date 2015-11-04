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
	var userid = req.query.userid;
	if (userid) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('DB Connection error!!');
				return;
			}
			console.log('DB Connection Success!!');
			connection.query('use vasket');
			connection.query('select count(*) result from user where userID=?', 
			[userid], function(err, result, field) {
				var isAlreadyUser = result[0].result;
				console.log(isAlreadyUser);
				if (isAlreadyUser == 1) {
					req.session.userid = userid;
					res.redirect('/');
					res.end();
					console.log('DB FB Login Success!!');
					//session config
				}
				else {
					res.redirect('/signup?userid='+userid);
					res.end();
				}
				connection.release();
			});
		});
	} else {
		res.redirect('/');
		res.end();
	}
});

module.exports = router;
