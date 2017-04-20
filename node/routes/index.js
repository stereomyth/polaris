var express = require('express');
var router = express.Router();
var $g = require('../env.js');

var fs = require('fs');

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

let home   = { lat: 52.4720187, long: -1.9104001 };
let berlin = { lat: 52.5200070, long: 13.4049540 };

/* GET index. */ 
router.get('/', function(req, res, next) {

  let map = 'https://www.google.com/maps/embed/v1/directions?' +
    'origin=' + home.lat + '%20' + home.long + 
    '&destination=' + berlin.lat + '%20' + berlin.long + 
    '&key=' + $g.mapKey;

  // console.log('baghdad to osaka', bearing({lat:35, long: 45}, {lat:35, long: 135})); // should be 77
  // console.log('bham to berlin', bearing(home, berlin)); // should be 84

  fs.readFile('coords.json', 'utf8', (err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    res.render('index', { 
      title: 'Polaris', 
      loc: json, 
      berlin: berlin, 
      src: map, 
      bearing: bearing(json, berlin).toFixed(3)
    });
  });

});

/*  GET single bearing */ 
router.get('/bearing', function(req, res, next) {
  // return single bearing of latest tweet.

  res.send(bearing(home, berlin).toString());
});

/*  SET current coords. */ 
router.post('/set', function(req, res, next) {

  fs.writeFile('coords.json', JSON.stringify(req.body), 'utf8', err => {
    if (err) throw err;
    res.send('saved');
  });

});

module.exports = router;
