var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userid) {
		var basket = req.session.basket;
		if (!basket)
			basket = [];
  		res.render('basket', {basket: basket});
	}
  	else
  		res.redirect('/');
});

module.exports = router;
