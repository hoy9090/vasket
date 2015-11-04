var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var json = {};
	json['userid'] = req.query.userid;
  res.render('signup', json);
});

module.exports = router;
