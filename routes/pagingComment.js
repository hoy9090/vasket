var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var pageNo = req.query.pageNo;
  res.render('detail#secC?pageNo='+pageNo);
});

module.exports = router;
