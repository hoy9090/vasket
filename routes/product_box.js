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
	var productNo = req.query.productNo;
	if (productNo) {
		if (req.session.userid) {
			pool.getConnection(function(err, connection) {
				if (err)
					console.error(err);
				connection.query('use vasket');
				connection.query('update product set view=view+1 where productNo='+productNo);
				connection.query('select image, imageCount, content, view, category, productName, nation, size, material, description, waterproof, gender, price, code, (select count(*) from productComment where productNo=?) as count, (select count(*) from productLikeList where productNo=?) as `like`, (select count(*) from productClipList where productNo=?) as `clip`, (select count(*) from productClipList where userNo=? and productNo=?) user_clip, (select count(*) from productLikeList where userNo=? and productNo=?) user_like from product where productNo='+productNo, [productNo, productNo, productNo, req.session.userNo, productNo, req.session.userNo, productNo] ,function(err, result, field) {
					if (err)
						console.error(err);
					var product = result[0];
					connection.query('SELECT round(avg(star), 1) star from productComment where productNo='+productNo, function(err, result, field) {
						if (err)
							console.error(err);
						var star = result[0];
						connection.query('SELECT commentNo, email, content, good, bad, star, (select isGood from productCommentGoodBad where userNo=? and commentNo = c.commentNo) isGood FROM productComment c join user u on c.userNo = u.userNo where productNo='+productNo+' order by c.commentNo desc', [req.session.userNo], function(err, result, field) {
							if (err)
								console.error(err);
							var comment = result;
							for (var index in comment) {
								var at_index_ = comment[index].email.indexOf('@');
								comment[index].email = comment[index].email.substr(0, 2)+'***@'+comment[index].email.substr(at_index_+1, 2);
							}
							connection.query('select brandNo, brandName brand, brandImageName image from brand where brandNo=(select brandNo from product where productNo=?);', [productNo], function(err, result, field) {
								if (err)
									console.error(err);
								var brandNo = result[0].brandNo;
								var brand = result[0].brand;
								var image = result[0].image;
								connection.query('select count(*) as `like` from brandLikeList where brandNo='+brandNo+' and userNo='+req.session.userNo, function(err, result, field) {
									if (err)
										console.error(err);
									connection.release();
									res.render('product_box', {product: product, productNo: productNo, comment: comment, star: star, brand: brand, brandNo: brandNo, image: image, like: result[0].like});
								});								
							});
						});
					});
				});
			});
		} else {
			pool.getConnection(function(err, connection) {
				if (err)
					console.error(err);
				connection.query('use vasket');
				connection.query('update product set view=view+1 where productNo='+productNo);
				connection.query('select image, imageCount, content, view, category, productName, nation, size, material, description, waterproof, gender, price, code, (select count(*) from productComment where productNo=?) as count, (select count(*) from productLikeList where productNo=?) as `like`, (select count(*) from productClipList where productNo=?) as `clip` from product where productNo='+productNo, [productNo, productNo, productNo], function(err, result, field) {
					if (err)
						console.error(err);
					var product = result[0];
					connection.query('SELECT round(avg(star), 1) star from productComment where productNo='+productNo, function(err, result, field) {
						if (err)
							console.error(err);
						var star = result[0];
						connection.query('SELECT commentNo, email, content, good, bad, star FROM productComment c join user u on c.userNo = u.userNo where productNo='+productNo+' order by c.commentNo desc', function(err, result, field) {
							if (err)
								console.error(err);
							var comment = result;
							for (var index in comment) {
								var at_index_ = comment[index].email.indexOf('@');
								comment[index].email = comment[index].email.substr(0, 2)+'***@'+comment[index].email.substr(at_index_+1, 2);
							}
							connection.query('select brandNo, brandName brand, brandImageName image from brand where brandNo=(select brandNo from product where productNo=?);', [productNo], function(err, result, field) {
								if (err)
									console.error(err);
								connection.release();
								res.render('product_box', {product: product, productNo: productNo, comment: comment, star: star, brand: result[0].brand, brandNo: result[0].brandNo, image: result[0].image});
							});
						});
					});
				});
			});
		}
	} else
		res.redirect('/');
});

module.exports = router;
