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
	if (req.session.userid) {
		var content = req.body.content;
		pool.getConnection(function(err, connection) {
				if (err) {
					console.error('DB Connection error!!');
				}
				console.log('DB Connection Success!!');
				connection.query('use vasket');
				connection.query('insert into communityComment(communityNo, userNo, content, regdate) values(?, ?, ?, now())', 
				[req.body.communityNo, req.session.userNo, content], function(err, result, field) {
					if (err) {
						console.error('DB Insertion error!!');
					}
					connection.release();
					res.redirect('/community_box?communityNo='+req.body.communityNo);
				});
			});
	} else {
		res.redirect('back');
	}
});

module.exports = router;
