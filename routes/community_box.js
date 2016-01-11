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
				connection.query('select brandImageName brandImage, brandName, email, image, community.content content, view, (select count(*) from communityComment where communityNo=?) as count, (select count(*) from communityLikeList where communityNo=?) as `like`, (select count(*) from communityLikeList where userNo=? and communityNo=?) user_like from community join user on community.userNo=user.userNo join brand on community.brandNo=brand.brandNo where communityNo='+communityNo, [communityNo, communityNo, req.session.userNo, communityNo] ,function(err, result, field) {
					var community = result[0];
					var at_index = community.email.indexOf('@');
					community.email = community.email.substr(0, 2)+'***@'+community.email.substr(at_index+1, 2);
					connection.query('SELECT email, content, date_format(regdate, "%Y-%m-%d %H:%i:%s") date FROM communityComment c join user u on c.userNo = u.userNo where communityNo='+communityNo+' order by c.commentNo', function(err, result, field) {
						connection.release();
						for (var index in result) {
							var at_index_ = result[index].email.indexOf('@');
							result[index].email = result[index].email.substr(0, 2)+'***@'+result[index].email.substr(at_index_+1, 2);
						}
						res.render('community_box', {community: community, communityNo: communityNo, comment: result});
					});
				});
			});
		} else {
			pool.getConnection(function(err, connection) {
				if (err)
					console.error(err);
				connection.query('use vasket');
				connection.query('update community set view=view+1 where communityNo='+communityNo);
				connection.query('select brandImageName brandImage, brandName, email, image, community.content content, view, (select count(*) from communityComment where communityNo=?) as count, (select count(*) from communityLikeList where communityNo=?) as `like` from community join user on community.userNo=user.userNo join brand on community.brandNo=brand.brandNo where communityNo='+communityNo, [communityNo, communityNo], function(err, result, field) {
					var community = result[0];
					var at_index = community.email.indexOf('@');
					community.email = community.email.substr(0, 2)+'***@'+community.email.substr(at_index+1, 2);
					connection.query('SELECT email, content, date_format(regdate, "%Y-%m-%d %H:%i:%s") date FROM communityComment c join user u on c.userNo = u.userNo where communityNo='+communityNo+' order by c.commentNo', function(err, result, field) {
						connection.release();
						for (var index in result) {
							var at_index_ = result[index].email.indexOf('@');
							result[index].email = result[index].email.substr(0, 2)+'***@'+result[index].email.substr(at_index_+1, 2);
						}
						res.render('community_box', {community: community, communityNo: communityNo, comment: result});
					});
				});
			});
		}
	} else
		res.redirect('/');
});

module.exports = router;
