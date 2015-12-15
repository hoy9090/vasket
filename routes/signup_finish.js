var express = require('express');
var md5 = require('md5');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var smtpTransport = nodemailer.createTransport("SMTP", {
	    service: 'Gmail',
	    auth: {
	        user: 'sklee7753',
	        pass: '121314aaaa'
	    }
	});

	var mailOptions = {
	    from: 'Vasket <noreply@vasket.co.kr>',
	    to: req.session.email,
	    subject: '바스켓 무료 코드 발급~~~',
	    text: md5(new Date().getTime()+"vasket")
	};

	smtpTransport.sendMail(mailOptions, function(error, response){
	    if (error){
	        console.log(error);
	    } else {
	        console.log("Message sent : " + response.message);
	    }
	    smtpTransport.close();
	});
  res.render('signup_finish');
});

module.exports = router;
