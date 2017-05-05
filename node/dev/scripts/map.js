/* globals console, google, document */

let initMap;

(function () {
  'use strict';

  let mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [ { "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 } ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [ { "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 } ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [ { "visibility": "off" } ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [ { "color": "#000000" }, { "lightness": 20 } ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [ { "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 } ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [ { "color": "#000000" }, { "lightness": 20 } ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [ { "color": "#000000" }, { "lightness": 21 } ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [ { "color": "#000000" }, { "lightness": 17 } ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [ { "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 } ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [ { "color": "#000000" }, { "lightness": 18 } ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [ { "color": "#000000" }, { "lightness": 16 } ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [ { "color": "#000000" }, { "lightness": 19 } ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [ { "color": "#222222" }, { "lightness": 0 } ]
    }
  ];

  initMap = () => {
    // Create a map object and specify the DOM element for display.
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      backgroundColor: '#222',
      disableDefaultUI: true,
      scrollwheel: false,
      styles: mapStyle,
      zoom: 1,
    });
    let location = new google.maps.Marker({
      position: hmm,
      map: map
    });
    let destination = new google.maps.Marker({
      position: dest,
      map: map
    });

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(location.position);
    bounds.extend(destination.position);
    map.fitBounds(bounds);

  };
}());

