var express = require('express');
var router = express.Router();
var md5 = require('md5');
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1012'
});

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    return d.toString();
}

/* GET home page. */
router.post('/', function(req, res, next) {
	var userid = req.body.userid;
	var year = req.body.year;
	var month = req.body.month;
	var day = req.body.day;
	var name = req.body.name;
	var gender = req.body.sex;
	var email = req.body.email;

	console.log(userid, year, month, day, name, gender, email);

	var smtpTransport = nodemailer.createTransport({
	    // service: 'Gmail',
	    // auth: {
	    //     user: 'sklee7753@gmail.com',
	    //     pass: '121314aaaa'
	    // }
	    host: 'localhost',
        port: 25,
        auth: {
            user: 'vasket',
            pass: '1012'
        },
        from: {
		    name: 'Vasket',
		    address: 'vasket@vasket.co.kr'
		},
        //tls: {rejectUnauthorized: false},
        debug:true
	});

	var code = md5(new Date().getTime()+"vasket");

	var mailOptions = {
	    to: email,
	    subject: 'Vasket 회원 코드를 입력해주세요.',
	    html: "<doctype html>		<html>			<head>				<meta charset='UTF-8'> <link href='http://vasket.co.kr/download/mail/font.css' rel='stylesheet'> 			</head>			<body>				<center>				<div id='title' style='font-family: nanumgothic; border-color: #ffa800; border-width: 0px; border-top-width: 3px; border-bottom-width: 3px; border-style: solid; margin-bottom: 20px; height: 70px; width: 700px;'>					<img src='http://vasket.co.kr/download/mail/logo_beta.jpg' style='float:left; padding-top:10px;'' width='200px;'>					<p id='title-p' style='font-size: 110%; font-weight: bold; float: right; padding-top: 25px;'>브랜드 전문 최저가 소셜커머스</p>				</div>				<div>					<img src='http://vasket.co.kr/download/mail/mail_detail.jpg' width='600px;'>				</div>				<div id='aa' style='font-family: nanumgothic; padding-bottom: 30px; border-width: 0px; border-color: #ffa800; border-style: solid; border-bottom-width: 3px; width: 700px; margin-top: 15px;'>					<div id='bb' style='background-color:#ffa800; border-radius: 10px; margin-bottom: 20px; padding-top: 10px; padding-bottom: 20px;'>						<h1 style='font-weight:bold;'>6개월 무료 코드</h1>						<h3 id='codeSec' style='width: 70%; border-style: solid; border-color: #ffffff; border-width: 4px; width: 500px; padding-top: 4px; padding-bottom: 4px; background-color: #ffffff;'>"+code+"</h3>		<a href='http://vasket.co.kr/enroll_code'><button id='codeButton' style='background-color: #bbbbbb; color:#000000; border-color: #ffa800; font-weight: bold; font-size:110%; padding-top: 6px; padding-bottom: 6px; width: 250px; height: 50px; font-family: nanumgothic;'> 코드 입력 하러 가기</button></a>					</div>				</div>				</center>			</body>		</html>",
	    text: code	
	};

	pool.getConnection(function(err, connection) {
		if (err) {
			console.error('DB Connection error!!');
			return;
		}
		console.log('DB Connection Success!!');
		connection.query('use vasket');
		connection.query('insert into user(userID, password, userName, userBirth, email, isFacebook, joindate, code) values(?, 1234, ?, ?, ?, 1, ?, ?)', [userid, name, year+"-"+twoDigits(month)+"-"+twoDigits(day), email, new Date(), code], function(err, result, field) {
			if (err) {
				console.error(err);
				return;
			}
			smtpTransport.sendMail(mailOptions, function(error, response){
			    if (error){
			        console.log(error);
			    } else {
			        console.log("Message sent : " + response.message);
			    }
			    smtpTransport.close();
			});
			req.session.userid = userid;
			req.session.email = email;
			req.session.name = name;
			connection.query('select userNo, grade, date_format(userBirth, "%Y-%m-%d") birth, phone from user where userID=?', 
			[userid], function(err, result, field) {
				req.session.userNo = result[0].userNo;
				req.session.grade = result[0].grade;
				req.session.birth = result[0].birth;
				req.session.phone = result[0].phone;
				res.redirect('signup_finish');
				connection.release();
			});
		});
	});
});

module.exports = router;
