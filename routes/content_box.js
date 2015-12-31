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
	var contentNo = req.query.contentNo;
	if (contentNo) {
		if (req.session.userid) {
			pool.getConnection(function(err, connection) {
				if (err)
					console.error(err);
				connection.query('use vasket');
				connection.query('update content set view=view+1 where contentNo='+contentNo);
				connection.query('select image, imageCount, content, view, (select count(*) from contentComment where contentNo=?) as count, (select count(*) from contentLikeList where contentNo=?) as `like`, (select count(*) from contentLikeList where userNo=? and contentNo=?) user_like from content where contentNo='+contentNo, [contentNo, contentNo, req.session.userNo, contentNo] ,function(err, result, field) {
					var content = result[0];
					connection.query('SELECT email, content FROM contentComment c join user u on c.userNo = u.userNo where contentNo='+contentNo, function(err, result, field) {
						connection.release();
						for (var index in result) {
							var at_index_ = result[index].email.indexOf('@');
							result[index].email = result[index].email.substr(0, 2)+'***@'+result[index].email.substr(at_index_+1, 2);
						}
						res.render('content_box', {content: content, contentNo: contentNo, comment: result});
					});
				});
			});
		} else {
			pool.getConnection(function(err, connection) {
				if (err)
					console.error(err);
				connection.query('use vasket');
				connection.query('update content set view=view+1 where contentNo='+contentNo);
				connection.query('select image, imageCount, content, view, (select count(*) from contentComment where contentNo=?) as count, (select count(*) from contentLikeList where contentNo=?) as `like` from content where contentNo='+contentNo, [contentNo, contentNo], function(err, result, field) {
					var content = result[0];
					connection.query('SELECT email, content FROM contentComment c join user u on c.userNo = u.userNo where contentNo='+contentNo, function(err, result, field) {
						connection.release();
						for (var index in result) {
							var at_index_ = result[index].email.indexOf('@');
							result[index].email = result[index].email.substr(0, 2)+'***@'+result[index].email.substr(at_index_+1, 2);
						}
						res.render('content_box', {content: content, contentNo: contentNo, comment: result});
					});
				});
			});
		}
	} else
		res.redirect('/');
});

module.exports = router;
