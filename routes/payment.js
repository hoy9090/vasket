var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'vasket1012'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userid) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('DEST DB Connection error!!');
				return;
			}
			connection.query('use vasket;');
			connection.query('select userName, phone, address, isDefault from destination where userNo=?;',
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
	} else {
		res.redirect('/');
	}
});

module.exports = router;
