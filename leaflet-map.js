const htmlSelector = "leaflet-wrapper";
const usCenter = [39.8283, -98.5795];
const zoom = 4;

strike_count_url = 'http://127.0.0.1:5000/strikes-by-airport'

const map = L.map(
    htmlSelector,
    {
        center : usCenter,
        zoom : zoom
    }
)

// Insert Bubble Layers Here
d3.json(strike_count_url).then((data) => {
    const bubbleArray = []

    for (strike of data) {
        const bubble = L.circle([strike["latitude"], strike["longitude"]], {
            color : "black",
            weight : 2,
            fillColor : "lime",
            fillOpacity : 0.75,
            radius : strike["strike_count"] * 25
        })

        bubble.bindPopup(strike["airport_name"])

        bubbleArray.push(bubble)
    }

    const tileLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tileLayer.addTo(map);

    const group = L.layerGroup(bubbleArray)

    group.addTo(map)
})

function refreshMap() {
    map.invalidateSize();
}