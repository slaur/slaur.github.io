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
    <div id="filters" style="margin-bottom: 10px;"></div>
    <div>
      <form class="form-inline">
        <div class="checkbox">
          <label>
            <input class="form-control" type="checkbox" id="showZones"> Districts
          </label>
          <label>
            <input class="form-control" type="checkbox" id="showClusters"> Clustering
          </label>
          <a href="/" class="btn btn-link btn-xs">Back to blog</a>
        </div>
      </form>
    </div>
  </div>
</div>