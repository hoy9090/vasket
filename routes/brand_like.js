var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'vasket.co.kr',
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
		console.log('DB Service Connection Success!!');
		connection.query('use vasket');
		if (req.body.command == 'insert') {
			connection.query('insert into brandLikeList(brandNo, userNo) values(?, ?)', [req.body.brandNo, req.session.userNo]);
		} else if (req.body.command == 'delete') {
			connection.query('delete from brandLikeList where userNo=? and brandNo=?', [req.session.userNo, req.body.brandNo]);
		}
		console.log('LIKE change success!!');
	});
});

module.exports = router;
