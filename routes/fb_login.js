var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.userid)
  	req.session.userid = req.query.userid;
  res.redirect('/');
});

module.exports = router;
