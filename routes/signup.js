var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', {userID: req.query.userid});
});

module.exports = router;
