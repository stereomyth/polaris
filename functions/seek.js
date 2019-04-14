exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
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
