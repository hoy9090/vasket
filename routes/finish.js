var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});

router.post('/', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('DB Connection error!!');
			return;
		}
		console.log('DB Connection Success!!');
		connection.query('use vasket');
		connection.query('insert into user set userID = ?, password = ?, email = ?, phone = ?, address = ?', 
		[req.body.id, req.body.pw, req.body.email, req.body.phone, req.body.address], function(err, result) {
		if (!err)
			console.log('DB Insertion Success!!');
		else
			console.error(err);
		connection.release();
	});
	res.redirect('join');
	});
});

module.exports = router;
