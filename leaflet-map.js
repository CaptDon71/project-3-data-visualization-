const htmlSelector = "leaflet-wrapper";

state_info_url = 'http://127.0.0.1:5000/state_center_zoom'
strike_count_url = 'http://127.0.0.1:5000/strikes-by-airport'

const init_center = [39.8283, -98.5795]
const init_zoom = 4

let map = L.map(
    htmlSelector,
    {
        center : init_center,
        zoom : init_zoom
    }
)

let bubbleGroup = {}

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

        bubble.bindPopup(`
            <div class="popup_row"><h3>Airport Name : </h3><p> ${strike["airport_name"]}</p></div>    
            <div class="popup_row"><h3>Number Of Strikes : </h3><p> ${strike["strike_count"]}</p></div>
            <div class="popup_row"><h3>Latitude : </h3><p> ${strike["latitude"]}</p></div>
            <div class="popup_row"><h3>Longitude : </h3><p> ${strike["longitude"]}</p></div>
        `)

        bubbleArray.push(bubble)
    }

    const tileLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tileLayer.addTo(map);

    bubbleGroup = L.layerGroup(bubbleArray)

    bubbleGroup.addTo(map)
})

function updateMapLocation() {
    d3.json(state_info_url).then((state_data) => {

        const center = [state_data[0], state_data[1]];
        const zoom = state_data[2];
        
        map.flyTo(center, zoom)
    })
}

function updateMapBubbles() {
    d3.json(strike_count_url).then((data) => {
        map.removeLayer(bubbleGroup)
        
        const bubbleArray = []
    
        for (strike of data) {
            const bubble = L.circle([strike["latitude"], strike["longitude"]], {
                color : "black",
                weight : 2,
                fillColor : "lime",
                fillOpacity : 0.75,
                radius : strike["strike_count"] * 25
            })
    
            bubble.bindPopup(`
                <div class="popup_row"><h3>Airport Name : </h3><p> ${strike["airport_name"]}</p></div>    
                <div class="popup_row"><h3>Number Of Strikes : </h3><p> ${strike["strike_count"]}</p></div>
                <div class="popup_row"><h3>Latitude : </h3><p> ${strike["latitude"]}</p></div>
                <div class="popup_row"><h3>Longitude : </h3><p> ${strike["longitude"]}</p></div>
            `)
    
            bubbleArray.push(bubble)
        }
        
        bubbleGroup = L.layerGroup(bubbleArray)
    
        bubbleGroup.addTo(map)
    })
}

function refreshMap() {
    map.invalidateSize()
}