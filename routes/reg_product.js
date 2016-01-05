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
var upload = multer({dest: 'public/images/products/'+image_path});

/* GET home page. */
router.post('/', upload.array('file'), function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query('use vasket');
		connection.query('insert into product(brandNo, image, imageCount, title, content, productName, category, nation, size, material, description, waterproof, gender, price, code, regdate) values((select brandNo from brand where brand.brandName = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())', [req.body.brand, image_path, req.files.length, req.body.title, req.body.content, req.body.productName, req.body.category, req.body.nation, req.body.size, req.body.material, req.body.description, req.body.waterproof, req.body.gender, req.body.price, req.body.code],
			function(err, result, field) {
				if (err) {
					console.error(err);
				}
				connection.release();
				for (var index in req.files)
					fs.rename('public/images/products/'+image_path+'/'+req.files[index].filename, 'public/images/products/'+image_path+'/'+index);
				res.redirect('/admin_console');
		});
	});
});

module.exports = router;
