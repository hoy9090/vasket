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
	if (req.session.userNo) {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select inquiryDate date, inquiryTitle title, inquiryNo no from inquiry where userNo='+req.session.userNo,
				function(err, result, field) {
				if (err) {
					console.error('DB inquiry Selection error!!');
					return;
				}
				connection.release();
				res.render('inquiry', {inquiry: result});
			});
		});
	} else {
		res.redirect('/');
	}
});

module.exports = router;
