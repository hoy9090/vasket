var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'vasket1012'
});

/* GET home page. */
router.post('/', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query('use vasket');
		if (req.body.do == 'insert')
			connection.query('insert into inquiry(userNo, email, phone, inquiryTitle, inquiryContent, inquiryDate, inquiryType) values(?, ?, ?, ?, ?, sysdate(), ?)', [req.session.userNo, req.body.email, req.body.phone, req.body.title, req.body.content, req.body.type],
				function(err, result, field) {
				if (err) {
					console.error('DB inquiry insertion error!!');
					return;
				}
				connection.release();
				res.redirect('/inquiry#2');
			});
		else {
			connection.query('delete from inquiry where inquiryNo='+req.body.inquiryNo,
				function(err, result, field) {
				if (err) {
					console.error('DB inquiry delete error!!');
					return;
				}
				connection.release();
				res.redirect('/inquiry#2');
			});
		}
	});
});

module.exports = router;
