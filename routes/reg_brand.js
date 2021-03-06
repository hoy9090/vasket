var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'public/images/brand_logo/'});

/* GET home page. */
router.post('/', upload.single('file'), function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query('use vasket');
		connection.query('insert into brand(brandName, brandNation, brandContent, brandCategory, brandImageName) values(?, ?, ?, ?, ?)', [req.body.name, req.body.nation, req.body.content, req.body.type, req.body.filename],
			function(err, result, field) {
				if (err) {
					console.error(err);
					return;
				}
				connection.release();
				fs.rename('public/images/brand_logo/'+req.file.filename, 'public/images/brand_logo/'+req.body.filename);
				res.redirect('/admin_console');
		});
	});
});

module.exports = router;
