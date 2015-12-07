var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/:filename', function(req, res, next) {
	if (req.header.referer && req.header.referer.endsWith('admin_console')) {
		var filename = req.params.filename;
	  var filepath = path.join(__dirname, '/files/', filename);
	  res.download(filepath, req.query.filename);
	} else {
		res.redirect('back');
	}
});

module.exports = router;
