var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});
var fs = require('fs');
var path = require('path');
var multer  = require('multer');
var upload = multer({dest: 'files/'});

/* GET home page. */
router.post('/',  upload.single('file'), function(req, res, next) {
	var name = req.body.name;
	var type = req.body.type;
	var addr = req.body.addr;
	var rep_name = req.body.rep_name;
	var rep_phone = req.body.rep_phone_1+'-'+req.body.rep_phone_2+'-'+req.body.rep_phone_3;
	var rep_email = req.body.rep_email_1+'@'+req.body.rep_email_2;
	var homepage = req.body.homepage;
	console.log(homepage);
	console.log('aaa');
	console.log(req.file);
	var file = req.file;
	console.log('bbb');
	var content = req.body.content;
	var filePath = path.join(__dirname, 'files', file.filename);
	console.log(filePath);
	fs.readFile(file.path, function(error, data) {
		if (error)
			console.log('sex');
		fs.writeFile(filePath, data, function(error) {
			if (error) {
				console.log('sex1');
				throw error;
			} else {
				pool.getConnection(function(err, connection) {
					if (err) {
						console.error('Partner DB Connection error!!');
						return;
					}
					console.log('DB Connection Success!!');
					connection.query('use vasket');
					connection.query('insert into partner(partnerName, partnerType, partnerAddr, repName, repPhone, repEmail, homepage, file, content) values(?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, type, addr, rep_name, rep_phone, rep_email, homepage, file.name, content],
					function(err, result, field) {
						if (err) {
							console.error('DB Insertion error!!');
							return;
						}
						connection.release();
						res.redirect('/');
					});
				});
			}
		});
	});

	
});

module.exports = router;
