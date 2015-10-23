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
		return;
	}
	console.log('DB Connection Success!!');
	connection.query('use vasket');
	connection.query('select count(*) result from user where userID=? and password=?', 
	[req.body.id, req.body.pw], function(err, result, field) {
			var isLogin = result[0].result;
			console.log(isLogin);
			if (isLogin == 1) {
				req.session.userid = req.body.id;
				res.redirect('/');
				res.end();
				console.log('DB ID/PW Success!!');
				//session config
			}
			else {
				res.writeHeader('content-type', 'text/javascript');
				res.write('<script>alert(\'Login Fail!!\');location.replace(\'/\');</script>');
				res.end();
				console.error('Login Fail!!');
			}
			connection.release();
			//res.redirect('/');
		});
	
	});
});

module.exports = router;
