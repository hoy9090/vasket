var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});

router.get('/', function(req, res, next) {
	var startIndex = req.query.startIndex;
	var offset = req.query.offset;
	var productNo = req.query.productNo;
	if (startIndex && offset && productNo) {
		pool.getConnection(function(err, connection) {
			var comment_query;
			if (req.session.userNo) {
				comment_query = 'SELECT commentNo, email, goodContent, badContent, content, good, bad, star, (select isGood from productCommentGoodBad where userNo='+req.session.userNo+' and commentNo = c.commentNo) isGood, date_format(regdate, "%Y-%m-%d %H:%i:%s") date FROM productComment c join user u on c.userNo = u.userNo where productNo='+productNo+' and commentNo <='+startIndex+' order by c.commentNo desc limit 0, '+offset;
			} else {
				comment_query = 'SELECT commentNo, email, goodContent, badContent, content, good, bad, star, date_format(regdate, "%Y-%m-%d %H:%i:%s") date FROM productComment c join user u on c.userNo = u.userNo where productNo='+productNo+' and commentNo <='+startIndex+' order by c.commentNo desc limit 0, '+offset;
			}
			console.log(comment_query);
			connection.query(comment_query, function(err, result, field) {
				connection.release();
				console.log(result);
				var comment = result;
				for (var idx in comment) {
					var at_index_ = comment[idx].email.indexOf('@');
					comment[idx].email = comment[idx].email.substr(0, 2)+'***@'+comment[idx].email.substr(at_index_+1, 2);
				}
				var html = '';
				for (var index in comment) {
						html += "<div class='comment-header col-xs-12' id='"+comment[index].commentNo+"'>";
						html += "<h5 class='bold' style='display: inline; color: #1F50B5'>"+comment[index].email+"</h5>";
						html += "<div class='goodbad'>";
						html += "<div class='good' onClick='good("+comment[index].commentNo+");' id='good"+comment[index].commentNo+"' style="+(comment[index].isGood == 1 ? "'border: 2px solid #FF0000;'" : "''")+">";
						html += "<img src='./images/good.png'><h6>"+comment[index].good+"</h6></div>";
						html += "<div class='bad' onClick='bad("+comment[index].commentNo+");' id='bad"+comment[index].commentNo+"' style="+(comment[index].isGood === 0 ? "'border: 2px solid #0000FF;'" : "''")+">";
						html += "<img src='./images/bad.png'><h6>"+comment[index].bad+"</h6></div></div></div>";
						html += "<div class='commentBlock col-xs-12' id='comment"+comment[index].commentNo+"'>";
						html += "<div class='comment_star'>";
						for (var i=0; i<comment[index].star; i++)
							html += "<img src='./images/star_on.png'>";
						for (var j=comment[index].star; j<5; j++)
							html += "<img src='./images/star.png'>";
						html += "</div><div class='date'><p>"+comment[index].date+"</p></div>";
						html += "<div id='content'><h5>장점</h5><h6>"+comment[index].goodContent+"</h6><h5>단점</h5><h6>"+comment[index].badContent+"</h6><h5>코멘트</h5><h6>"+comment[index].content+"</h6></div></div>";
						console.log(html);
				}
				res.send(html);
			});
		});
	} else {
		res.send('');
	}
});

module.exports = router;