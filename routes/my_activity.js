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
				connection.query('select c.contentNo, c.image, c.view, (select count(*) from contentClipList where contentNo=c.contentNo) clip, (select count(*) from contentComment where contentNo=c.contentNo) as `count`, (select count(*) from contentLikeList where contentNo=c.contentNo) as `like`, (select count(*) from contentLikeList where contentNo=c.contentNo and userNo=?) user_like, c.title from content c inner join contentClipList on c.contentNo = contentClipList.contentNo where userNo=? order by c.contentNo desc', [req.session.userNo, req.session.userNo], function(err, result, field) {
					if (err) {
						console.error(err);
					}
					var content = result;
					connection.query('select p.productNo, p.image, p.view, (select count(*) from productClipList where productNo=p.productNo) clip, (select count(*) from productComment where productNo=p.productNo) as `count`, (select count(*) from productLikeList where productNo=p.productNo) as `like`, (select count(*) from productLikeList where productNo=p.productNo and userNo=?) user_like, p.title from product p inner join productClipList on p.productNo= productClipList.productNo where userNo=? order by p.productNo desc;', [req.session.userNo, req.session.userNo], function(err, result, field) {
						if (err) {
							console.error(err);
						}	
						connection.release();
						res.render('my_activity', {community: community, content: content, product: result});
					});
				});
			});
		});

	} else {
		res.redirect('back');
	}
});

module.exports = router;
