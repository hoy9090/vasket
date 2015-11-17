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
  if (req.body.tab == '#secA')
  	console.log(req.body.name, req.body.phone, req.body.addr);
  else {
  	console.log(req.body.name, req.body.phone, req.body.addr, req.body.add, req.body.isDefault);
  	if (req.body.add == 'true') {
	  	pool.getConnection(function(err, connection) {
	  		if (err) {
					console.error('DB Connection error!!');
					return;
				}
				console.log('DB Connection Success!!');
				connection.query('use vasket');
				if (req.body.isDefault == 'true') {
					connection.query('update destination set isDefault=0 where userNo=?', [req.session.userNo]);
				}
				connection.query('insert into destination(userNo, userName, phone, address, isDefault) values(?, ?, ?, ?, ?)', [req.session.userNo, req.body.name, req.body.phone, req.body.addr, req.body.isDefault == 'true' ? 1 : 0]);
				//function(err, result, field)

	  	});
		}
  }
  res.end();
});

module.exports = router;
