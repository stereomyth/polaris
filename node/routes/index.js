var express = require('express');
var router = express.Router();
var $g = require('../env.js');

/* GET home page. */
router.get('/:lat/:long', function(req, res, next) {

  let berlin = { lat: 52.5200070, long: 13.4049540};

  let map = 'https://www.google.com/maps/embed/v1/directions?' +
    'origin=' + req.params.lat + '%20' + req.params.long + 
    '&destination=' + berlin.lat + '%20' + berlin.long + 
    '&key=' + $g.mapKey;

  res.render('index', { loc: req.params, berlin: berlin, src: map, bearing: '' });
});

module.exports = router;
