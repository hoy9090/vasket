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
	var code = req.body.code;
	pool.getConnection(function(err, connection) {
		if (err)
			console.error(err);
		connection.query('use vasket');
		connection.query('select grade, code from user where userNo='+req.session.userNo, function(err, result, field) {
			if (err)
				console.error(err);
			var grade = result[0].grade;
			var db_code = result[0].code;
			if (code == db_code && grade == '일반') {
				connection.query('update user set grade="프리미엄" where userNo='+req.session.userNo);
				res.send({text: "코드 인증이 완료되었습니다", color: "#000000"});
			} else if (code == db_code) {
				res.send({text: "이미 코드 인증을 완료하셨습니다", color: "#000000"});
			} else {
				res.send({text: "잘못된 코드입니다", color: "#FF0000"});
			}
			connection.release();
		});
	});
});

module.exports = router;
