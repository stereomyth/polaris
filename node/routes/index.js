var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:lat/:long', function(req, res, next) {
  let berlin = { lat: 52.5200070, long: 13.4049540};

  res.render('index', { title: 'lol', loc: req.params, berlin: berlin });
});

module.exports = router;
