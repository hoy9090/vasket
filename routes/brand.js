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
	var brandNo = req.query.brandNo;
	if (!req.session.userid) {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select brandName brand, brandImageName image from brand where brandNo='+brandNo,
				function(err, result, field) {
				if (err) {
					console.error(err);
				}
				var brand = result[0].brand;
				var image = result[0].image;
				connection.query('select c.communityNo, email, image, c.content content, view, (select count(*) from communityComment where communityComment.communityNo = c.communityNo) as `count`, (select count(*) from communityLikeList where communityLikeList.communityNo = c.communityNo) as `like` from community c join user ON c.userNo = user.userNo join brand ON c.brandNo = brand.brandNo where c.brandNo = ? order by c.communityNo desc;', [brandNo], function(err, result, field) {
					if (err) {
						console.error(err);
					}
					var community = result;
					for (var index in community) {
						var at_index_ = community[index].email.indexOf('@');
						community[index].email = community[index].email.substr(0, 2)+'***@'+community[index].email.substr(at_index_+1, 2);
					}
					connection.query('select productNo, image, title, content, view, (select count(*) from productComment where productComment.productNo=p.productNo) as `count`, (select count(*) from productLikeList where productLikeList.productNo=p.productNo) as `like`, (select count(*) from productClipList where productClipList.productNo=p.productNo) clip from product p where p.brandNo=? order by p.productNo desc;', [brandNo], function(err, result, field) {
						if (err) {
							console.error(err);
						}
						connection.release();
						for (var index in result) {
							result[index].user_like = 0;
							result[index].user_clip = 0;
						}
						res.render('brand', {brand: brand, brandNo: brandNo, image: image, community: community, product: result});	
					});
				});
			});
		});
	} else {
		pool.getConnection(function(err, connection) {
			connection.query('use vasket');
			connection.query('select brandName brand, brandImageName image from brand where brandNo='+brandNo,
				function(err, result, field) {
				if (err) {
					console.error(err);
				}
				var brand = result[0].brand;
				var image = result[0].image;
				connection.query('select count(*) as "like" from brandLikeList where brandNo='+brandNo+' and userNo='+req.session.userNo,
					function(err, result, field) {
						if (err) {
							console.error(err);
						}
						var like = result[0].like;
						connection.query('select c.communityNo, email, image, c.content content, view, (select count(*) from communityComment where communityComment.communityNo = c.communityNo) as `count`, (select count(*) from communityLikeList where communityLikeList.communityNo = c.communityNo) as `like`, (select count(*) from communityLikeList where userNo=? and communityNo = c.communityNo) user_like from community c join user ON c.userNo = user.userNo join brand ON c.brandNo = brand.brandNo where c.brandNo = ? order by c.communityNo desc;', [req.session.userNo, brandNo], function(err, result, field) {
							if (err) {
								console.error(err);
							}
							var community = result;
							for (var index in community) {
								var at_index_ = community[index].email.indexOf('@');
								community[index].email = community[index].email.substr(0, 2)+'***@'+community[index].email.substr(at_index_+1, 2);
							}
							connection.query('select productNo, image, title, content, view, (select count(*) from productComment where productComment.productNo=p.productNo) as `count`, (select count(*) from productLikeList where productLikeList.productNo=p.productNo) as `like`, (select count(*) from productClipList where productClipList.productNo=p.productNo) clip, (select count(*) from productLikeList where userNo=? and productNo = p.productNo) user_like, (select count(*) from productClipList where userNo=? and productNo = p.productNo) user_clip from product p where p.brandNo=? order by p.productNo desc;', [req.session.userNo, req.session.userNo, brandNo], function(err, result, field) {
								if (err) {
									console.error(err);
								}
								connection.release();
								res.render('brand', {brand: brand, like: like, brandNo: brandNo, image: image, community: community, product: result});
							});
						});
					});
			});
		});
	}
});

module.exports = router;
