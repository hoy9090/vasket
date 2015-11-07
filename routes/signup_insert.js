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
	var userid = req.body.userid;
	var year = req.body.year;
	var month = req.body.month;
	var day = req.body.day;
	var name = req.body.name;
	var gender = req.body.sex;
	var email = req.body.email;

	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('DB Connection error!!');
			return;
		}
		console.log('DB Connection Success!!');
		connection.query('use vasket');
		connection.query('insert into user(userID, password, userName, userBirth, email, isFacebook, joindate) values(?, 1234, ?, ?, ?, 0, ?)', [userid, name, year+'-'+day+'-'+month, email, new Date()], function(err, result, field) {
			if (err) {
				console.error('DB Connection error!!');
				return;
			}
			res.redirect('signup_finish');
			res.end();
			connection.release();
		});
	});
});

module.exports = router;
