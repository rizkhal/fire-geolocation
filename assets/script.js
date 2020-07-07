
if (! navigator.geolocation) {
    alert('Oh snap! Geolocation is not supported by your browser!');
}

navigator.geolocation.getCurrentPosition(
    pos => console.log('aa'),
    err => console.error('Unable to retrieve your location!')
);

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Titik api yang terdeteksi.')
    .openPopup();
