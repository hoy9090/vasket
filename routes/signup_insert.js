var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'vasket1012'
});

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    return d.toString();
}

/* GET home page. */
router.post('/', function(req, res, next) {
	var userid = req.body.userid;
	var year = req.body.year;
	var month = req.body.month;
	var day = req.body.day;
	var name = req.body.name;
	var gender = req.body.sex;
	var email = req.body.email;

	console.log(userid, year, month, day, name, gender, email);

	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('DB Connection error!!');
			return;
		}
		console.log('DB Connection Success!!');
		connection.query('use vasket');
		connection.query('insert into user(userID, password, userName, userBirth, email, isFacebook, joindate) values(?, 1234, ?, ?, ?, 1, ?)', [userid, name, year+"-"+twoDigits(month)+"-"+twoDigits(day), email, new Date()], function(err, result, field) {
			if (err) {
				console.error(err);
				return;
			}
			req.session.userid = userid;
			req.session.email = email;
			req.session.name = name;
			connection.query('select userNo from user where userID=?', 
			[userid], function(err, result, field) {
				req.session.userNo = result[0].userNo;
				res.redirect('signup_finish');
				connection.release();
			});
		});
	});
});

module.exports = router;
