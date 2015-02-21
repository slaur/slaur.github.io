---
layout: post
title: Map experiment
---

I wanted to start with a map, it's a nice warm up and who doesn't love maps ?

I used [MapBox](https://www.mapbox.com/) and [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) to display Paris taxi stations, grouped by districts.

- Why Paris taxi stations ?

  - It's one the first set of data that showed up when I looked at [Open Data Paris](http://opendata.paris.fr). Yes I'm this kind of guy...

So let's create a basic map and add some markers from a geoJSON file. Each district (with a distinct zip code) has its color :

{% highlight javascript %}
var mapId = 'YourMapId';
var map = L.mapbox.map().addLayer(L.mapbox.tileLayer(mapId));
var featureLayer = L.mapbox.featureLayer();
featureLayer.on('layeradd', function (e) {
  var marker = e.layer;
  var feature = marker.feature;
  var zipCode = feature.properties['zip_code'];
  var featureColor = getColorByPostalCode(zipCode);
  //Custom icon
  marker.setIcon(
    L.mapbox.marker.icon({
      'marker-color': featureColor
    })
  );
});
featureLayer.addTo(map);
featureLayer.loadURL(dataUrl);
{% endhighlight %}

I was mainly interested into markers clusters. [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) makes it easy :

{% highlight javascript %}
//Remove single markers
map.removeLayer(featureLayer);
//Add cluster
var clusterGroup = new L.MarkerClusterGroup();
featureLayer.eachLayer(function(layer) {
  clusterGroup.addLayer(layer);
});
map.addLayer(clusterGroup);
{% endhighlight %}

That was fine but i wanted to group my markers by district, and show clusters with different colors.
So I decided to create several cluster layers, one per district. The `ready` event is fired when geoJSON markers have been added.

You can bind a function to each single marker that will be added to this layer. I put each marker in it's district cluster.

{% highlight javascript %}
featureLayer.on('ready', function(e) {
  e.target.eachLayer(function(layer) {
    var properties = layer.feature.properties;
    var zipCode = properties['zip_code'];
    if (! uniqueFilters[zipCode]) {
      distinctFilters.push(zipCode);
      uniqueFilters[zipCode] = true;
      var zoneClusterGroup = new L.MarkerClusterGroup();
      clusterGroups[zipCode] = zoneClusterGroup;
    }
    clusterGroups[zipCode].addLayer(layer);
  });
});
{% endhighlight %}

Check the result [here](/public/pages/2015-02-04/map).