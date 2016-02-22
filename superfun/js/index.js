mapboxgl.accessToken = 'pk.eyJ1IjoieHJ3YW5nODgiLCJhIjoiY2lobWx1bmU2MG9hZXQ0bHo2MndhMmR6NyJ9.Ey-TLWVJdG5kN54aOlbrmw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/xrwang88/cikx5a3nj00fv9flxpmu14ptv', //stylesheet location
    center: [-74.50, 40], // starting position
    zoom: 10// starting zoom
});

map.addControl(new mapboxgl.Navigation());

var geocoder = new mapboxgl.Geocoder();

var geoc = map.addControl(geocoder);


var geolocate = document.getElementById('current-location-btn');

// the unsecure and decrepit html5 location getter api

  if (!navigator.geolocation) {
      alert('Geolocation is not available');
  } else {
      geolocate.onclick = function (e) {
        navigator.geolocation.getCurrentPosition(callback);
    };
  }

  function callback(position) {
     console.log(position.coords.latitude);
     console.log(position.coords.longitude);

    map.flyTo({
        center: [
            position.coords.longitude,
            position.coords.latitude]
    });



  }

  // var latitude = position.coords.latitude;
  // var longitude = position.coords.longitude;


// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    alert('Position could not be found');
});
