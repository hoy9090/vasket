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
	if (communityNo) {
		if (req.session.userid) {
			pool.getConnection(function(err, connection) {
				if (err)
					console.error(err);
				connection.query('use vasket');
				connection.query('update community set view=view+1 where communityNo='+communityNo);
				connection.query('select brandImageName brandImage, brandName, email, image, community.content content, view, (select count(commentNo) from community, communityComment where community.communityNo = communityComment.commentNo) as count, (select count(*) from communityLikeList, community where communityLikeList.communityNo = community.communityNo) as `like`, (select count(*) from communityLikeList where userNo=? and communityNo=?) user_like from community join user on community.userNo=user.userNo join brand on community.brandNo=brand.brandNo where communityNo='+communityNo, [req.session.userNo, communityNo] ,function(err, result, field) {
					connection.release();
					var at_index = result[0].email.indexOf('@');
					result[0].email = result[0].email.substr(0, 2)+'***@'+result[0].email.substr(at_index+1, 2);
					res.render('community_box', {community: result[0], communityNo: communityNo});
				});
			});
		} else {
			pool.getConnection(function(err, connection) {
				if (err)
					console.error(err);
				connection.query('use vasket');
				connection.query('update community set view=view+1 where communityNo='+communityNo);
				connection.query('select brandImageName brandImage, brandName, email, image, community.content content, view, (select count(commentNo) from community, communityComment where community.communityNo = communityComment.commentNo) as count, (select count(*) from communityLikeList, community where communityLikeList.communityNo = community.communityNo) as `like` from community join user on community.userNo=user.userNo join brand on community.brandNo=brand.brandNo where communityNo='+communityNo, function(err, result, field) {
					connection.release();
					var at_index = result[0].email.indexOf('@');
					result[0].email = result[0].email.substr(0, 2)+'***@'+result[0].email.substr(at_index+1, 2);
					res.render('community_box', {community: result[0], communityNo: communityNo});
				});
			});
		}
	} else
		res.redirect('/');
});

module.exports = router;
