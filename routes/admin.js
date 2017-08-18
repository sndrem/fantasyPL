var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin_index', { title: 'Tippelapp-Admin' });
});

router.get('/answers', function(req, res, next) {
	res.render('admin_answers', {title: 'Svar for tippelappen'});
})

module.exports = router;
