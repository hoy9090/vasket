var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.userid = null;
	req.session.email = null;
	req.session.name = null;
	req.session.userNo = null;
  res.redirect('/');
});

module.exports = router;
