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
	if (req.session.userNo) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('DB Connection error!!');
			}
			console.log('DB Service Connection Success!!');
			connection.query('use vasket');
			connection.query('select brandNo, brandName, brandContent, brandImageName image from brand', function(err, result, field) {
				if (err) {
					console.error(err);
				}
				var brand = result;
				connection.query('select brandNo from brandLikeList where userNo=?', [req.session.userNo], function(err, result, field) {
					if (err) {
						console.error(err);
					}
					var brandLike = result;
					connection.query('select productNo, productName, productPrice from productlist', function(err, result, field) {
						if (err) {
							console.error(err);
						}
						var product = result;
						connection.query('select c.communityNo, brandImageName, brandName, email, image, c.content content, view, (select count(*) from communityComment where communityComment.communityNo = c.communityNo) as `count`, (select count(*) from communityLikeList where communityLikeList.communityNo = c.communityNo) as `like`, (select count(*) from communityLikeList where userNo=? and communityNo = c.communityNo) user_like from community c join user ON c.userNo = user.userNo join brand ON c.brandNo = brand.brandNo order by c.communityNo desc;', [req.session.userNo], function(err, result, field) {
							if (err) {
								console.error(err);
							}
							var community = result;
							for (var index in community) {
								var at_index = community[index].email.indexOf('@');
								community[index].email = community[index].email.substr(0, 2)+'***@'+community[index].email.substr(at_index+1, 2);
							}
							connection.query('select c.contentNo, c.image, c.title, c.view, (select count(*) from contentComment where contentComment.contentNo = c.contentNo) as `count`, (select count(*) from contentLikeList where contentLikeList.contentNo = c.contentNo) as `like`, (select count(*) from contentLikeList where userNo=? and contentNo = c.contentNo) user_like from content c join user ON c.userNo = user.userNo order by c.contentNo desc;', [req.session.userNo], function(err, result, field) {
								if (err) {
								console.error(err);
								}
								connection.release();
								res.render('service', {brand: brand, brandLike: brandLike, product: product, community: community, content: result});
							});
						});	
					});
				});
			});
		});
	} else {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.error('DB Connection error!!');
			}
			console.log('DB Service Connection Success!!');
			connection.query('use vasket');
			connection.query('select brandNo, brandName, brandContent, brandImageName image from brand', function(err, result, field) {
				if (err) {
					console.error(err);
				}
				var brand = result;
				connection.query('select productNo, productName, productPrice from productlist', function(err, result, field) {
					if (err) {
						console.error(err);
					}
					var product = result;
					connection.query('select c.communityNo, brandImageName, brandName, email, image, c.content content, view, (select count(*) from communityComment where communityComment.communityNo = c.communityNo) as `count`, (select count(*) from communityLikeList where communityLikeList.communityNo = c.communityNo) as `like` from community c join user ON c.userNo = user.userNo join brand ON c.brandNo = brand.brandNo order by c.communityNo desc;', function(err, result, field) {
						if (err) {
							console.error(err);
						}
						var community = result;
						for (var index in community) {
							var at_index = community[index].email.indexOf('@');
							community[index].email = community[index].email.substr(0, 2)+'***@'+community[index].email.substr(at_index+1, 2);
						}
						connection.query('select c.contentNo, c.image, c.title, c.view, (select count(*) from contentComment where contentComment.contentNo = c.contentNo) as `count`, (select count(*) from contentLikeList where contentLikeList.contentNo = c.contentNo) as `like`, (select count(*) from contentLikeList where userNo=? and contentNo = c.contentNo) user_like from content c join user ON c.userNo = user.userNo order by c.contentNo desc;', [req.session.userNo], function(err, result, field) {
							if (err) {
								console.error(err);
							}
							connection.release();
							res.render('service', {brand: brand, brandLike: 0, product: product, community: community, content: result});
						});
					});	
				});
			});
		});
	}
});

module.exports = router;
