$(document).ready(function() {
  //Uncheck checkboxes at page refresh...
  $('#showClusters').prop('checked', false);
  $('#showZones').prop('checked', false);

  //Colors
  var colors = {
    'green': '#d3e46f',
    'purple': '#ceb5cf',
    'red': '#fdaf6b',
    'blue': '#a3cec5',
    'yellow': '#fae364',
    'pink': '#f3c1d3'
  };

  function getColorByPostalCode(postalCode) {
    var colorKeys = Object.keys(colors);
    var colorIndex = postalCode % colorKeys.length;
    var colorName = colorKeys[colorIndex];
    return colors[colorKeys[colorIndex]];
  }

  //Initialize map
  var mapId = 'rezzowl.l4iagd4c';
  var mapToken = 'pk.eyJ1IjoicmV6em93bCIsImEiOiJyLUp1NC00In0.QBYfm8yqruBMT0S50Yd0xg';
  L.mapbox.accessToken = mapToken;
  var map = L.mapbox.map('map', null, {
    attributionControl: false,
    infoControl: true
  })
  .setView([48.856, 2.354], 12)
  .addLayer(L.mapbox.tileLayer(mapId));

  //Feature layer (markers)
  var featureLayer = L.mapbox.featureLayer();
  featureLayer.on('layeradd', function (e) {
    var marker = e.layer;
    var feature = marker.feature;
    //Custom icon
    marker.setIcon(
      L.mapbox.marker.icon({
        'marker-size': 'small',
        'marker-symbol': 'circle',
        'marker-color': getColorByPostalCode(feature.properties['zip_code'])//'#fa0'
      })
    );
    //Custom popup
    var popupContent = '<b>' + feature.properties['station_name'] + '</b>';
    popupContent += '<div>' + feature.properties['address'] + '</div>';
    marker.bindPopup(L.popup().setContent(popupContent));
  });
  featureLayer.addTo(map);
  featureLayer.loadURL('/public/pages/2015-02-04/data/taxis.geojson');

  //Zones layer (polygons)
  var zoneLayer = L.mapbox.featureLayer();
  zoneLayer.on('layeradd', function (e) {
    var marker = e.layer;
    var feature = marker.feature;
      //Custom polygon
      var zoneColor = getColorByPostalCode(feature.properties['postal_code']);
      marker.setStyle({
        'fillColor': zoneColor,
        'fillOpacity': 0.5,
        'stroke': false,
        'weight': 1
      }
      );
    });
  zoneLayer.loadURL('/public/pages/2015-02-04/data/districts.geojson');
  zoneLayer.on('click', function(e) {
    var valueClicked = e.layer.feature.properties['postal_code'];
    var $filterSelected = $('#filters .filter[data-value="' + valueClicked + '"]');
    $filterSelected.click();
  });

  //Construct filter
  var uniqueFilters = {};
  var distinctFilters = [];
  var clusterGroups = {};
  featureLayer.on('ready', function(e) {
    e.target.eachLayer(function(layer) {
      var properties = layer.feature.properties;
      var zipCode = properties['zip_code'];
      if (! uniqueFilters[zipCode]) {
        distinctFilters.push(zipCode);
        uniqueFilters[zipCode] = true;
        var zoneClusterGroup = new L.MarkerClusterGroup({ 
          showCoverageOnHover: false,
          disableClusteringAtZoom: 15,
          iconCreateFunction: function(cluster) {
            return L.mapbox.marker.icon({
              // Show the number of markers in the cluster on the icon.
              'marker-symbol': cluster.getChildCount(),
              'marker-color': getColorByPostalCode(zipCode)
            });
          }
        });
        clusterGroups[zipCode] = zoneClusterGroup;
      }
      clusterGroups[zipCode].addLayer(layer);
    });
    distinctFilters.sort();
    $filterSelect = $('#filters');
    for (var i = 0; i < distinctFilters.length; i++) {
      $filterSelect.append('<btn style="background-color: ' + getColorByPostalCode(distinctFilters[i]) + '"' 
        + '" class="filter label" data-value="' + distinctFilters[i] + '">' 
        + distinctFilters[i] + '</btn>');
    };
  });

  //Unique cluster
  //var clusterGroup = new L.MarkerClusterGroup({ 
  //  showCoverageOnHover: false,
  //  disableClusteringAtZoom: 15,
  //  iconCreateFunction: function(cluster) {
  //      return L.mapbox.marker.icon({
  //          // Show the number of markers in the cluster on the icon.
  //          'marker-symbol': cluster.getChildCount(),
  //          'marker-color': '#422'
  //      });
  //  }
  // });

  $('#showClusters').on('click', function(e) {
    if ($(this).is(':checked')) {
      map.removeLayer(featureLayer);
      renderClusters();
      featureLayer.on('filterChanged', function(e) {
        renderClusters();
      });
    } else {
      removeClusters();
      featureLayer.addTo(map);
      featureLayer.off('filterChanged');
    }
  });

  $('#showZones').on('click', function(e) {
    if ($(this).is(':checked')) {
      zoneLayer.addTo(map);
    } else {
      map.removeLayer(zoneLayer);
    }
  });

  $(document).on('click', '#filters .filter', function(e) {
    $(this).toggleClass('active');
    var selectedZipCodes = [];
    $('#filters .filter.active').each(function() {
      selectedZipCodes.push($(this).attr('data-value'));
    });
    var filterFunction = function() {
      return true;
    }
    if (selectedZipCodes.length > 0) {
      filterFunction = function(feature) {
        return $.inArray(feature.properties['zip_code'], selectedZipCodes) > -1;
      };
    }
    featureLayer.setFilter(filterFunction);
    featureLayer.fireEvent('filterChanged');
  });

  function renderClusters() {
    //Unique cluster
    //clusterGroup.clearLayers();
    //featureLayer.eachLayer(function(layer) {
        //clusterGroup.addLayer(layer);
    //});
    //map.addLayer(clusterGroup);

    //Multiple clusters
    for (var i = 0; i < distinctFilters.length; i++) {
      map.removeLayer(clusterGroups[distinctFilters[i]]);
    };
    $filters = $('#filters .filter.active');
    $activeFilters = $filters;
    if ($filters.length < 1) {
      $activeFilters = $('#filters .filter');
    }
    $activeFilters.each(function() {
      map.addLayer(clusterGroups[$(this).attr('data-value')]);
    });
  }

  function removeClusters() {
    //Unique cluster
    //map.removeLayer(clusterGroup);

    //Multiple clusters
    for (var i = 0; i < distinctFilters.length; i++) {
      map.removeLayer(clusterGroups[distinctFilters[i]]);
    };
  }
  
});