var express = require('express');
var router = express.Router();
var $g = require('../env.js');

toRad = deg => deg * Math.PI / 180;
toDeg = rad => rad * 180 / Math.PI;

let bearing = (start, end) => {
  var φ1 = toRad(start.lat), φ2 = toRad(end.lat);
  var Δλ = toRad(end.long - start.long);

  var y = Math.sin(Δλ) * Math.cos(φ2);
  var x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  var θ = Math.atan2(y, x);

  return (toDeg(θ) + 360) % 360;
};

/* GET home page. */ 
router.get('/:lat/:long', function(req, res, next) {

  let berlin = { lat: 53, long: 13 };

  let map = 'https://www.google.com/maps/embed/v1/directions?' +
    'origin=' + req.params.lat + '%20' + req.params.long + 
    '&destination=' + berlin.lat + '%20' + berlin.long + 
    '&key=' + $g.mapKey;

  // console.log('baghdad to osaka', bearing({lat:35, long: 45}, {lat:35, long: 135})); // should be 77
  // console.log('bham to berlin', bearing(req.params, berlin)); // should be 84

  res.render('index', { title: 'Polaris', loc: req.params, berlin: berlin, src: map, bearing: bearing(req.params, berlin) });
});

module.exports = router;
