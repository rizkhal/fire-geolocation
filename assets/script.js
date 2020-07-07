
const API_KEY = "pk.eyJ1Ijoicml6a2hhbCIsImEiOiJja2NjNDE1ZjkwMTBwMndxbmFxNWpydXh3In0.hBOjF3Ivn7bfT7hK1gmydg";

/**
 * Map located in Mabes Pemadam Kebakaran
 * @type {const}
 */
const map = L.map('map').setView([-5.151996, 119.416099], 14);

L.marker([-5.151996, 119.416099]).addTo(map)
    .bindPopup('Kantor Pemadam Kebakaran.')
    .openPopup();

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${API_KEY}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: `${API_KEY}`
}).addTo(map);

L.marker([-5.151858, 119.449124]).addTo(map)
    .bindPopup('Titik Api Terdeteksi.')
    .openPopup();

const circle = L.circle([-5.151858, 119.449124], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(-5.151996, 119.416099),
        L.latLng(-5.151858, 119.449124),
    ],
    routeWhileDragging: true,
}).addTo(map);
