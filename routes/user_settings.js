var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('user_settings', {grade: req.session.grade, name: req.session.name, birth: req.session.birth, phone: req.session.phone});
});

module.exports = router;
