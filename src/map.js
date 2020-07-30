FireMap = (function(window) {

    "use strict";

    const API_KEY = "pk.eyJ1Ijoicml6a2hhbCIsImEiOiJja2NjNDE1ZjkwMTBwMndxbmFxNWpydXh3In0.hBOjF3Ivn7bfT7hK1gmydg";

    let settings = {
        zoom: null,
        center: [0, 0],
    };

    let mapId = '',
        map = null,
        circle = null,
        baseMaps = {},
        overlayMaps = {},
        routingControl = null;

    const init = (mapLayerId, options) => {
        settings = L.extend(settings, options);
        mapId = mapLayerId;
        initMap();
    };

    const getMap = function () {
        return map;
    };

    const addRoutingControl = (waypoints) => { 
        if (routingControl != null) {
            removeRoutingControl();
        }

        var loc = [waypoints[1].lat, waypoints[1].lng];

        circle = L.circle(loc, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map)
            .bindPopup(`Lat: ${waypoints[1].lat}. Lng: ${waypoints[1].lng}`)
            .openPopup();

        routingControl = L.Routing.control({
            waypoints: waypoints
        }).addTo(map);
    };

    const removeRoutingControl = () => {
        if (routingControl != null) {
            map.removeControl(routingControl);
            map.removeLayer(circle);
            routingControl = null;
            circle = null;
        }
    };

    const panMap = (lat, lng) => {
        map.panTo(new L.LatLng(lat, lng));
    };

    const centerMap = (e) => {
        panMap(e.latlng.lat, e.latlng.lng);
    }

    const zoomIn = (e) => {
        map.zoomIn();
    }

    const zoomOut = (e) => {
        map.zoomOut();
    }

    const initMap = () =>{
        var $this = this;

        map = L.map(mapId, {
            center: settings.center,
            zoom: settings.zoom,
            crs: L.CRS.EPSG3857,
            attributionControl: true,
            contextmenu: true,
            contextmenuWidth: 140
        });

        baseMaps["OSM"] = L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${API_KEY}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 19,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: API_KEY
        }).addTo(map);
    };

    const invalidateMapSize = () => {
        map.invalidateSize();
    }

    return {
        init: init, addRoutingControl: addRoutingControl, removeRoutingControl: removeRoutingControl, 
        panMap: panMap, invalidateMapSize: invalidateMapSize, getMap: getMap
    }

})(window);
