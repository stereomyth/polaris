const axios = require('axios');

require('dotenv').config();

exports.handler = (event, context, callback) => {
  const credentialsBase64Encoded = Buffer.from(
    `${process.env.TWITTER_API}:${process.env.TWITTER_SECRET}`
  ).toString('base64');

  let accessToken = '';

  axios
    .post(
      'https://api.twitter.com/oauth2/token',
      'grant_type=client_credentials',
      { headers: { Authorization: `Basic ${credentialsBase64Encoded}` } }
    )
    .then(res => {
      accessToken = res.data.access_token;
    })
    .catch(error => {
      callback(null, {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data.error),
      });
    });

  axios
    .get('https://api.twitter.com/1.1/tweets/search/30day/dev.json', {
      headers: { authorization: `Bearer ${accessToken}` },
    })
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: res.data.title,
      });
    })
    .catch(error => {
      callback(null, {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data.error),
      });
    });
};

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
