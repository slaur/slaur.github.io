---
layout: sample
title: Map sample
styles:
 - https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css
 - https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css
 - https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css
 - https://api.tiles.mapbox.com/mapbox.js/v2.1.5/mapbox.css
 - /public/pages/2015-02-04/map.css
scripts:
 - https://code.jquery.com/jquery-1.11.2.min.js
 - https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js
 - https://api.tiles.mapbox.com/mapbox.js/v2.1.5/mapbox.js
 - https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js
 - /public/pages/2015-02-04/map.js
---

<div id="wrapper">
  <div id="map"></div>
  <div id="nav">
    <p>Paris taxis stations (2011)</p>
    <div id="filters" style="margin-bottom: 10px;"></div>
    <div>
      <input type="checkbox" id="showZones" style="margin-right: 5px;">
      <label for="showZones" style="margin-right: 20px;">Districts</label>
      <input type="checkbox" id="showClusters" style="margin-right: 5px;">
      <label for="showClusters" style="margin-right: 20px;">Clustering</label>
      <a href="{% post_url 2015-02-04-map-experiment %}" class="btn btn-link btn-xs">Back to blog</a>
    </div>
  </div>
</div>