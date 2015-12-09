var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});
var path = require('path');
var multer = require('multer');


/* GET home page. */
router.post('/', upload.single('file'), function(req, res, next) {
	//fs.rename('public/images/brand_logo/'+req.file.name, 'public/images/brand_logo/')
	var storage = multer.diskStorage({
	    destination: function (req, file, cb) {
	        cb(null, 'public/images/brand_logo/');
	    },
	    filename: function (req, file, cb) {
	        cb(null, req.body.filename);
	  }
	});
	var upload = multer({ storage: storage }).single('file');
	upload(req, res, function (err) {
	    if (err) {
	      return;
    }});
	pool.getConnection(function(err, connection) {
		connection.query('use vasket');
		connection.query('insert into brand(brandName, brandNation, brandContent, brandCategory, brandImageName) values(?, ?, ?, ?, ?)', [req.body.name, req.body.nation, req.body.content, req.body.type, req.body.filename],
			function(err, result, field) {
				if (err) {
					console.error(err);
					return;
				}
				connection.release();
				res.redirect('/admin_console');
		});
	});
});

module.exports = router;
