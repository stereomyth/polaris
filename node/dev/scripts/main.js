/* globals document, fetch, navigator, alert, console */
'use strict';

let setCoords = (lat, long) => {
  if (lat && long) {
    fetch('/set', {
      method: 'post',
      body: JSON.stringify({ lat: lat, long: long }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      console.log('success');
      document.getElementById('update-success').className += ' visible';
    }).catch(err => {
      console.log('error', err);
    });
  }
};

document.getElementById('set-btn').addEventListener('click', event => {
  let lat = document.getElementById('lat').value;
  let long = document.getElementById('long').value;

  setCoords(lat, long);
}, false);

if ("geolocation" in navigator) {
  document.getElementById('geo-btn').className += ' visible';
}

document.getElementById('geo-btn').addEventListener('click', event => {
  navigator.geolocation.getCurrentPosition( position => {
    let lat = document.getElementById('lat').value = position.coords.latitude.toFixed(3);
    let long = document.getElementById('long').value = position.coords.longitude.toFixed(3);

    setCoords(lat, long);
  },
  error => { alert(error.message); });
  
}, false);


