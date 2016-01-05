var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});
var multer = require('multer');
var upload = multer({dest: 'public/images/community/'});

/* GET home page. */
router.post('/', upload.single('file'), function(req, res, next) {
	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('DB Connection error!!');
		}
		var brand = req.body.brand;
		var content = req.body.content;
		var file = req.file;
		connection.query('use vasket');
		connection.query('insert into community(userNo, brandNo, image, content, regdate) values(?, (select brandNo from brand where brandName=?), ?, ?, sysdate())', [req.session.userNo, brand, file.filename, content], function(err, result, field) {
			if (err)
				console.error(err);
			connection.release();
			res.redirect('/service#3');
		});
	});
});

module.exports = router;
