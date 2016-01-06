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
					var product = result[0];
					connection.query('SELECT email, content FROM productComment c join user u on c.userNo = u.userNo where productNo='+productNo+' order by c.commentNo', function(err, result, field) {
						connection.release();
						for (var index in result) {
							var at_index_ = result[index].email.indexOf('@');
							result[index].email = result[index].email.substr(0, 2)+'***@'+result[index].email.substr(at_index_+1, 2);
						}
						res.render('product_box', {product: product, productNo: productNo, comment: result});
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
					var product = result[0];
					connection.query('SELECT email, content FROM productComment c join user u on c.userNo = u.userNo where productNo='+productNo+' order by c.commentNo', function(err, result, field) {
						connection.release();
						for (var index in result) {
							var at_index_ = result[index].email.indexOf('@');
							result[index].email = result[index].email.substr(0, 2)+'***@'+result[index].email.substr(at_index_+1, 2);
						}
						res.render('product_box', {product: product, productNo: productNo, comment: result});
					});
				});
			});
		}
	} else
		res.redirect('/');
});

module.exports = router;
