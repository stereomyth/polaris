const axios = require('axios');

require('dotenv').config();

exports.handler = (event, context, callback) => {
  getToken()
    .then(res => getTweets(res.data.access_token))
    .then(response => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data),
      });
    })
    .catch(error => {
      // console.log(error.response);
      callback(null, {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data),
      });
    });
};

const twitter = axios.create({
  baseURL: 'https://api.twitter.com/',
});

function getToken() {
  const basic = Buffer.from(
    `${process.env.TWITTER_API}:${process.env.TWITTER_SECRET}`
  ).toString('base64');

  return twitter.post('oauth2/token', 'grant_type=client_credentials', {
    headers: { Authorization: `Basic ${basic}` },
  });
}

function getTweets(token) {
  return twitter.get('1.1/search/tweets.json', {
    // return twitter.get('1.1/tweets/search/30day/dev.json', {
    params: { q: 'i wish', count: 100 },
    headers: { authorization: `Bearer ${token}` },
  });
}

// toRad = deg => deg * Math.PI / 180;
// toDeg = rad => rad * 180 / Math.PI;

// let bearing = (start, end) => {
//   var φ1 = toRad(start.lat), φ2 = toRad(end.lat);
//   var Δλ = toRad(end.long - start.long);

//   var y = Math.sin(Δλ) * Math.cos(φ2);
//   var x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
//   var θ = Math.atan2(y, x);

//   return (toDeg(θ) + 360) % 360;
// };

// let home   = { lat: 52.4720187, long: -1.9104001 };
// let berlin = { lat: 52.5200070, long: 13.4049540 };
