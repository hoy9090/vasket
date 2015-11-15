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
	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('DEST DB Connection error!!');
			return;
		}
		connection.query('use vasket;');
		connection.query('select userName, phone, address from destination where userNo=?;',
			[req.session.userNo], function(err, result, field) {
			if (err) {
				console.error(err);
				return;
			}
			var dest = result;
			connection.release();
			res.render('payment', {dest: dest, name: req.session.name, email: req.session.email});
		});
	});
});

module.exports = router;
