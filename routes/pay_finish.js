var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body.name, req.body.phone, req.body.addr);
  res.end();
});

module.exports = router;
