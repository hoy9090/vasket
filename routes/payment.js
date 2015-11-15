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
		console.log(req.session.userNo);
		connection.query('select userName, phone, address from destination where userNo=?', [req.session.userNo], function(err, result, field) {
			if (err) {
				console.error('DEST DB select error!!');
				return;
			}
			var dest = result;
			res.render('payment', {dest: dest});
		});
	});
});

module.exports = router;
