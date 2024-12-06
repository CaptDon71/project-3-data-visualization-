const htmlSelector = "leaflet-wrapper";
const usCenter = [39.8283, -98.5795];
const zoom = 4;

const map = L.map(
    htmlSelector,
    {
        center : usCenter,
        zoom : zoom
    }
)

const tileLayer = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
);

// Insert Bubble Layers Here

tileLayer.addTo(map);

function refreshMap() {
    map.invalidateSize();
}