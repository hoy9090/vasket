var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  if (req.body.tab == '#secA')
  	console.log(req.body.name, req.body.phone, req.body.addr);
  else {
  	console.log(req.body.name, req.body.phone, req.body.addr, req.body.add, req.body.isDefault);
  }
  res.end();
});

module.exports = router;
