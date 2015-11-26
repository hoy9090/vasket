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
	req.method = 'get';
	var content = req.body.content;
	pool.getConnection(function(err, connection) {
			if (err) {
				console.error('DB Connection error!!');
				return;
			}
			console.log('DB Connection Success!!');
			connection.query('use vasket');
			connection.query('insert into comment(userNo, content, date) values(?, ?, now())', 
			[req.session.userNo, content], function(err, result, field) {
				if (err) {
					console.error('DB Insertion error!!');
					return;
				}
				connection.release();
				res.redirect('/detail#secC');
			});
		});
});

module.exports = router;
