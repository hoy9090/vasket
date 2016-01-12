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
		var goodContent = req.body.goodContent.trim();
		var badContent = req.body.badContent.trim();
		var content = req.body.content.trim();
		var code = [];
		if (goodContent.length < 10) {
			code.push(1);	
		}
		if (badContent.length < 10) {
			code.push(2);	
		}
		if (content.length < 10) {
			code.push(3);	
		}
		if (code.length !== 0)
			res.send({status: "error", code: code});
		else
			pool.getConnection(function(err, connection) {
				if (err) {
					console.error('DB Connection error!!');
				}
				console.log('DB Connection Success!!');
				connection.query('use vasket');
				connection.query('insert into productComment(productNo, userNo, goodContent, badContent, content, star, regdate) values(?, ?, ?, ?, ?, ?, now())', 
				[req.body.productNo, req.session.userNo, goodContent, badContent, content, req.body.star], function(err, result, field) {
					if (err) {
						console.error('DB Insertion error!!');
					}
					connection.release();
					res.send({status: "success"});
				});
			});
	} else {
		res.redirect('back');
	}
});

module.exports = router;
