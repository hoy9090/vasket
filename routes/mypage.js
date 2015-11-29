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
	if (!req.session.userid)
		res.redirect('/');
	else {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select brand.brandNo, brandName brand, brandContent content, brandImageName image from brand inner join (select brandNo from brandLikeList where userNo='+req.session.userNo+') brandlike where brandlike.brandNo=brand.brandNo',
				function(err, result, field) {
				if (err) {
					console.error(err);
					return;
				}
				connection.release();
				res.render('mypage', {email: req.session.email, result: result});
			});
		});
	}
});

module.exports = router;
