var express = require('express');
var router = express.Router();
var env = require('../env.js');
var Twitter = require('twitter');

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


// var OAuth2 = require('OAuth').OAuth2; 
// var oauth2 = new OAuth2(env.twitter.api, env.twitter.secret, 'https://api.twitter.com/', null, 'oauth2/token', null);
// oauth2.getOAuthAccessToken('', {
//     'grant_type': 'client_credentials'
//   }, function (e, access_token) {
//       console.log(access_token); //string that we can use to authenticate request
// });

let getCoords = new Promise ((resolve, reject) => {
  fs.readFile('coords.json', 'utf8', (err, data) => {
    if (!err) {
      resolve(JSON.parse(data)); 
    } else {
      reject(err);
    }
  });
});

let searchOpts = {
  q: '"I wish"',
  result_type: 'recent',
  include_entities: false,
  count: 50,
};

var twitter = new Twitter({
  consumer_key: env.twitter.api,
  consumer_secret: env.twitter.secret,
  bearer_token: env.twitter.bearer
});

let getTweets = new Promise ((resolve, reject) => {
  twitter.get('search/tweets', searchOpts, function(error, tweets, response) {
    if (error) {
      reject(error);
    } else {
      resolve(tweets);
    }
  });
});

/* GET index. */ 
router.get('/', function (req, res, next) {

  let map = 'https://www.google.com/maps/embed/v1/directions?' +
    'origin=' + home.lat + '%20' + home.long + 
    '&destination=' + berlin.lat + '%20' + berlin.long + 
    '&key=' + env.mapKey;

  Promise.all([getCoords, getTweets]).then(results => {
    let [coords, tweets] = results;
    res.render('index', { 
      title: 'Polaris',
      berlin: berlin,
      coords: coords,
      src: map, 
      bearing: bearing(coords, berlin).toFixed(3),
      tweets: tweets,
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
