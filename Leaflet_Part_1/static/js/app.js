 var url = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

 var map = L.map('map').setView([37.8, -96], 4);

// Add a base layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
    
}).addTo(map);


 d3.json(url).then(function (data) {
    createFeatures(data.features);
  });
  

  // features
  function createFeatures(earthquakeData) {

    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    }).addTo(map);
  
    createMap(earthquakes);

    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
    var marker = L.circleMarker(latlng, {
      radius: feature.properties.mag * 5, 
      color: getColor(feature.geometry.coordinates[2]),
      weight: 1,
      fillOpacity: 0.8
      });
      return marker;
  };

// legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    var colors = ['#00FF00', '#FFFF00', '#FFA500', '#FF0000', '#8B008B'];
    var labels = ['<10', '10-50', '50-100', '100-200', '>200'];

    for (var i = 0; i < colors.length; i++) {

        var legendItem = L.DomUtil.create('i', 'legend-item');
        legendItem.style.backgroundColor = colors[i];
        legendItem.innerHTML = labels[i];

        div.appendChild(legendItem);
    }

    return div;
};

legend.addTo(map);