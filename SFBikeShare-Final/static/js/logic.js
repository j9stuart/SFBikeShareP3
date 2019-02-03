function createMap(bikestation) {

  // Create the tile layer that will be the background of our map
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Dark Map": darkmap,
    "Light Map": lightmap,
    "Street Map": streetmap,
  };

  var overlayMaps = {
    "Bike Stations": bikestation
  };

  
  var map = L.map("map", {
    center: [37.56, -122.3],
    zoom: 10,
    layers: [lightmap, bikestation]
  });


  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  //console.log(response.features[0].geometry.coordinates);

  var stations = response.features;

  //Initialize an array to hold bike markers
  var bikeMarkers = [];

  // Loop through the stations array
  for (var index = 0; index < stations.length; index++) {
    var station = stations[index];


    // For each station, create a marker and bind a popup with the station's name
    var bikeicon = L.icon({
      iconUrl: '../static/img/bike.png',
      iconSize:     [25, 30],
    });
    var bikeMarker = L.marker([station.geometry.coordinates[1], station.geometry.coordinates[0]], {icon: bikeicon})
      .bindPopup("<h3>" + station.properties.name + "<h3><h3>dock_count: " + station.properties.dock_count + "<h3>");


  


    // Add the marker to the bikeMarkers array
    bikeMarkers.push(bikeMarker);
  }
  console.log(bikeMarkers);
  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(bikeMarkers));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("../static/json/bikestation.geojson", createMarkers);

function circleMarkerColor(installation_date) {
  if (installation_date <= 1/1/2013) {
      return "#DC7C62";
  } else if (installation_date <= 1/1/2014) {
      return "#FABA69";
  } else if (installation_date <= 1/1/2015) {
      return "#DAE862";
  } else if (installation_date <= 1/1/2016) {
      return "#58D68D";
  };
}