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
	var communityNo = req.query.communityNo;
	pool.getConnection(function(err, connection) {
		if (err)
			console.error(err);
		connection.query('use vasket');
		connection.query('select brandImageName brandImage, brandName, email, image, community.content content, view from community join user on community.userNo=user.userNo join brand on community.brandNo=brand.brandNo where communityNo='+communityNo, function(err, result, field) {
			connection.release();
			res.render('community_box', {community: result[0]});
		});
	});
});

module.exports = router;
