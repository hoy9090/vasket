var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.userid = null;
  res.redirect('index');
});

module.exports = router;
