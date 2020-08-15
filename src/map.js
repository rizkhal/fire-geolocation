FireMap = (function(window) {

    "use strict";

    const API_KEY = "pk.eyJ1Ijoicml6a2hhbCIsImEiOiJja2NjNDE1ZjkwMTBwMndxbmFxNWpydXh3In0.hBOjF3Ivn7bfT7hK1gmydg";

    let settings = {
        zoom: null,
        center: [0, 0],
    };

    let mapId = '',
        map = null,
        fire = null,
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

    const addMabes = (mabes) => {
        let p, marker, coords = [];

        mabes.forEach((obj) => {
            marker = L.marker(obj.pos).addTo(map),
                p = new L.Popup({
                        autoClose: false,
                        closeOnClick: false
                    })
                    .setContent(obj.pop)
                    .setLatLng(obj.pos);

            marker.bindPopup(p).openPopup();
        });
    };

    const addRoutingControl = (loc, mabes) => {
        if (routingControl != null) {
            removeRoutingControl();
        }

        let coords = [];
        mabes.forEach((obj) => {
            coords.push(obj.pos);
        });

        var closset = L.GeometryUtil.closest(map, [coords], loc, true);

        var close = [closset.lat, closset.lng];

        circle = L.circle(loc, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);

        routingControl = L.Routing.control({
            waypoints: [close, loc]
        }).addTo(map);

        routingControl.hide();

        let name;
        for (var ayu in mabes) {
            if (mabes[ayu].pos[0] == close[0] && mabes[ayu].pos[1] == close[1]) {
                name = mabes[ayu].pop;
            }
        }

        let element = document.getElementById('info'),
            url  = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.lat}&lon=${loc.lng}`;

        f(url).then(response => {
            console.log(response);
            let det;
            if (response.addresstype == 'road') {
                det = response.address.village;
            } else if(response.addresstype == 'amenity') {
                det = response.address.amenity;
            }

            fire = L.marker(loc).addTo(map).bindPopup(`Titik Api: ${response.address.road}. <br> Detail: ${det}`).openPopup();

            swal({
                title: "Titik Api Terdeteksi!",
                text: `Api terdeteksi di ${response.address.road} \n Perkiraan geographical point dari kantor terdekat ke titik api ${closset.distance}`,
                icon: "info",
            });
        });
    };

    const f = async (url) => {
        return await fetch(url)
            .then((response) => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error(error);
            });
    };

    const removeRoutingControl = () => {
        if (routingControl != null) {
            map.removeControl(routingControl);
            map.removeLayer(circle);
            map.removeLayer(fire);
            routingControl = null;
            circle = null;
            fire = null;
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
            maxZoom: 20,
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
        panMap: panMap, invalidateMapSize: invalidateMapSize, getMap: getMap,
        addMabes: addMabes
    }

})(window);
