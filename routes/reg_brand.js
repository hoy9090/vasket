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
router.post('/', function(req, res, next) {
	var upload = multer({dest: 'public/images/brand_logo/', rename: function(fieldname, filename) {
						console.log(req.body.filename);
						console.log('aaa');
					    return req.body.filename;
					}
			}).single('file');
	upload(req, res, function (err) {
	    if (err) {
	    	console.log('server dead');
	      return;
	    }
	});
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
