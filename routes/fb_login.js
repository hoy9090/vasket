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
	var userid = req.body.id;
	if (userid) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('DB Connection error!!');
				return;
			}
			console.log('DB Connection Success!!');
			connection.query('use vasket');
			connection.query('select count(*) result, userNo, grade, userBirth, phone from user where userID=?', 
			[userid], function(err, result, field) {
				var isAlreadyUser = result[0].result;
				console.log(isAlreadyUser);
				if (isAlreadyUser == 1) {
					req.session.userid = userid;
					req.session.email = req.body.email;
					req.session.name = req.body.name;
					req.session.userNo = result[0].userNo;
					req.session.grade = result[0].grade;
					req.session.birth = result[0].userBirth;
					req.session.phone = result[0].phone;
					console.log('DB FB Login Success!!');
					res.end();
					connection.release();
				} else {
					connection.release();
					console.log('FIRST TIME!');
					res.json({
                    id      : req.body.id, 
                    name    : req.body.name, 
                    birthday: req.body.birthday, 
                    gender  : req.body.gender,
                    email	: req.body.email
                  });
				}
			});
		});
	} else {
		res.redirect('/');
		res.end();
	}
});

module.exports = router;
