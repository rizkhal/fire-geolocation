// const loc = [-5.151858, 119.449124];

const API_KEY = "pk.eyJ1Ijoicml6a2hhbCIsImEiOiJja2NjNDE1ZjkwMTBwMndxbmFxNWpydXh3In0.hBOjF3Ivn7bfT7hK1gmydg";

/**
 * Map located in Mabes Pemadam Kebakaran
 * @type {mixed}
 */
const map = L.map('map').setView([-5.151996, 119.416099], 13);

map.on('click', (e) => {
    L.popup()
     .setLatLng(e.latlng)
     .setContent("You clicked the map at " + e.latlng.toString())
     .openOn(map);
});

/**
 * Credits of the maps
 * @type {void}
 */
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${API_KEY}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);

/**
 * Database reference
 * @type {object}
 */
const db = firebase.database().ref().child('fire-geolocation');

db.on('value', (snapshot) => {
    if (snapshot.exists()) {
        const loc = [];
        snapshot.forEach(list => {
            if (list.val().status) {
                loc.push(list.val().lat, list.val().lng);
                /**
                 * LatLng of the office and fire where sensor detector
                 * @type {Array}
                 */
                const markers = [
                    {position: [-5.151996, 119.416099], popup: "MABES Pemadam Kebakaran"},
                    {position: loc, popup: "Titik Api"},
                ];

                /**
                 * Markers of the location
                 * @param  {array} obj
                 * @return {void}
                 */
                markers.some(obj => {
                    let m = L.marker(obj.position).addTo(map),
                        p = new L.Popup({autoClose: false})
                                 .setContent(obj.popup)
                                 .setLatLng(obj.position);
                        m.bindPopup(p).openPopup();
                });

                const circle = L.circle(loc, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(map);

                const routing = L.Routing.control({
                    waypoints: [
                        L.latLng(-5.151996, 119.416099),
                        L.latLng(loc.map(x => x)),
                    ],
                    routeWhileDragging: true,
                }).addTo(map);
            }
        });
    } else {
        console.error('Table doesnt exists!');
    }
});

