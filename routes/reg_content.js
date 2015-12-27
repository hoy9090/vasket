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
var md5 = require('md5');
var image_path = md5(new Date()+'vasket');
var upload = multer({dest: 'public/images/contents/'+image_path});

/* GET home page. */
router.post('/', upload.array('file'), function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query('use vasket');
		connection.query('insert into content(image, imageCount, content, regdate) values(?, ?, ?, now())', [image_path, req.files.length, req.body.content],
			function(err, result, field) {
				if (err) {
					console.error(err);
				}
				connection.release();
				for (var index in req.files)
					fs.rename('public/images/contents/'+image_path+'/'+req.file[index].filename, 'public/images/contents/'+image_path+'/'+index);
				res.redirect('/admin_console');
		});
	});
});

module.exports = router;
