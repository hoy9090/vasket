var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});

router.get('/', function(req, res, next) {
	if (req.session.userid) {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select c.communityNo, brandImageName, brandName, image, c.content content, view, (select count(*) from communityComment where communityComment.communityNo = c.communityNo) as `count`, (select count(*) from communityLikeList where communityLikeList.communityNo = c.communityNo) as `like`, (select count(*) from communityLikeList where userNo=? and communityNo = c.communityNo) user_like from community c join user ON c.userNo = user.userNo join brand ON c.brandNo = brand.brandNo where c.userNo = ? order by c.communityNo desc;', [req.session.userNo, req.session.userNo], function(err, result, field) {
				if (err) {
					console.error(err);
				}
				var community = result;
				//connection.query('FILL SQL!!!', function(err, result, field) {
				//	if (err) {
				//		console.error(err);
				//	}
					connection.release();
					res.render('my_activity', {community: community});
				//});
			});
		});

	} else {
		res.redirect('back');
	}
});

module.exports = router;
