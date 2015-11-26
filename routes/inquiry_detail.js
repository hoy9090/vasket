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
		connection.query('use vasket');
		connection.query('select date_format(inquiryDate, "%Y-%m-%d %H:%i:%s") date, inquiryTitle title, inquiryContent content from inquiry where inquiryNo='+req.body.inquiryNo,
			function(err, result, field) {
				if (err) {
					console.error('DB inquiry selection error!!');
					return;
				}
			connection.release();
			res.render('inquiry_detail', {result: result});
			});
		});
});

module.exports = router;
