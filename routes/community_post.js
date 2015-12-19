var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userid)
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('DB Connection error!!');
				return;
			}
			connection.query('use vasket');
			connection.query('select brandName brand from brand', function(err, result, field) {
				connection.release();
				res.render('community_post', {brand: result});
			});
		});
	else
		res.redirect('/service#3');
});

module.exports = router;
