mapboxgl.accessToken = 'pk.eyJ1IjoieHJ3YW5nODgiLCJhIjoiY2lobWx1bmU2MG9hZXQ0bHo2MndhMmR6NyJ9.Ey-TLWVJdG5kN54aOlbrmw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/xrwang88/cikx5a3nj00fv9flxpmu14ptv', //stylesheet location
    center: [-74.50, 40], // starting position
    zoom: 10// starting zoom
});

map.addControl(new mapboxgl.Navigation());



map.on('style.load', function () {
    map.addSource("markers", {
        "type": "geojson",
        "data": superfunds
    });

    map.addLayer({
        "id": "markers",
        "interactive": true,
        "type": "symbol",
        "source": "markers",
        "layout": {
            "icon-image": "superfund",
            "icon-size": 1.25
        },
        "paint": {
            /*"text-size": 10,*/
        }
    });
});

map.on('click', function (e) {
    // Use featuresAt to get features within a given radius of the click event
    // Use layer option to avoid getting results from other layers
    map.featuresAt(e.point, {layer: 'markers', radius: 10, includeGeometry: true}, function (err, features) {
        if (err) throw err;
        // if there are features within the given radius of the click event,
        // fly to the location of the click event
        if (features.length) {
            // Get coordinates from the symbol and center the map on those coordinates
            // map.flyTo({center: features[0].geometry.coordinates});
            var featureName = features[0].properties.NAME;
            var featureHRS= features[0].properties.HRS;
            var featureStat = features[0].properties.NPLSTAT;
            var featureDate = features[0].properties.STATUS_DAT;
            var tooltip = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<p>' + 'Name of site: '+ featureName + '</br>'+'HRS: '+ featureHRS + '</br>' + 'Status of site: '+ featureStat +'</br>'+ 'Last status update: ' + featureDate + '</p>' )
                .addTo(map);
        }
    });
});


// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    map.featuresAt(e.point, {layer: 'markers', radius: 10}, function (err, features) {
        if (err) throw err;
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
});


var geocoder = new mapboxgl.Geocoder({position: 'bottom-right'});

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
