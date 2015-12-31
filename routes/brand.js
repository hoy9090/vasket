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
					connection.release();
					res.render('brand', {brand: brand, brandNo: brandNo, image: image, community: result});
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
						connection.query('select c.communityNo, email, image, c.content content, view, (select count(*) from communityComment where communityComment.communityNo = c.communityNo) as `count`, (select count(*) from communityLikeList where communityLikeList.communityNo = c.communityNo) as `like`, (select count(*) from communityLikeList where userNo=? and communityNo = c.communityNo) user_like from community c join user ON c.userNo = user.userNo join brand ON c.brandNo = brand.brandNo where c.brandNo = ? order by c.communityNo desc;', [req.session.userNo, brandNo], function(err, result, field) {
							if (err) {
								console.error(err);
							}
							connection.release();
							res.render('brand', {brand: brand, like: result[0].like, brandNo: brandNo, image: image, community: result});
						});
					});
			});
		});
	}
});

module.exports = router;
