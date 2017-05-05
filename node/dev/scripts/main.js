/* globals $, document, fetch, navigator, alert, console */
(function () {
  'use strict';

  let setCoords = (lat, long) => {
    if (lat && long) {
      fetch('/set', {
        method: 'post',
        body: JSON.stringify({ lat: lat, long: long }),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => {
        console.log('success');
        $('.update-success').addClass('visible');
      }).catch(err => {
        console.log('error', err);
      });
    }
  };

  $('.set-btn').on('click', function () {
    let lat = $('#lat').val();
    let long = $('#long').val();

    setCoords(lat, long);
  });

  if ("geolocation" in navigator) {
    $('.geo-btn').show();
  }

  $('.geo-btn').on('click', function () {
    navigator.geolocation.getCurrentPosition( position => {
      let lat = $('#lat').val(position.coords.latitude.toFixed(3));
      let long = $('#long').val(position.coords.longitude.toFixed(3));

      setCoords(lat, long);
    },
    error => { alert(error.message); });
  });
}());
