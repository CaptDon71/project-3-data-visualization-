const initSelector1URL = "http://127.0.0.1:5000/update_selected_area/All%20States"
const initSelector2URL = "http://127.0.0.1:5000/update_airport_limit/All%20Airports"

fetch(initSelector1URL)
fetch(initSelector2URL)

const graphDescriptions = {
    "graph1" : {
        "title" : "Aircraft Type and Bird Strike Incidents",
        "text" : "This bar chart examines the relationship between aircraft types and bird strike incidents using FAA data. The analysis shows that larger, faster aircraft, such as the Airbus A320 and Boeing 737, experience higher numbers of bird strikes, with the A320 leading in incidents. In contrast, smaller aircraft generally encounter fewer strikes. These findings highlight opportunities for design enhancements, including informed aircraft model selection and engine modifications to reduce bird strike risks."
    },
    "graph2" : {
        "title" : "Seasonal Trends of Bird Strikes by Month",
        "text" : "The graph illustrates the monthly distribution of bird strikes, highlighting seasonal trends. It shows peak activity during migration periods, particularly in spring (April–May) and late summer to fall (August–October), with lower occurrences in winter months (December–February)"
    },
    "graph3" : {
        "title" : "Number Of Birdstrikes In Each Damage Category By Bird Size",
        "text" : "The chart shows that most bird strikes result in \"Minor Damage\". \"Aircraft Destroyed\" events are rare across all bird sizes. \"Substantial Damage\" happens more often. But, the data shows that you are pretty safe if your plane is hit."
    }
}

for (let index = 1; index <= 3; index++) {
    const titleObject = document.getElementById(`graph-${index}-title`);
    const textObject = document.getElementById(`graph-${index}-text`);
    const graphDesc = graphDescriptions[`graph${index}`];

    titleObject.textContent = graphDesc.title;
    textObject.textContent = graphDesc.text;
}

dropdown_title_1 = "States"
dropdown_title_2 = "Airport Limit"

document.getElementById("dropdown-title-1").textContent = dropdown_title_1
document.getElementById("dropdown-title-2").textContent = dropdown_title_2

const dropdown_1_values = {
    "All States" : [39.8283, -98.5795,  4],
    "AL" : [32.3182, -86.9023,  7],
    "AK" : [63.5888, -154.4931, 5],
    "AZ" : [34.0489, -111.0937, 7],
    "AR" : [35.2010, -91.8318,  7],
    "CA" : [36.7783, -119.4179, 6],
    "CO" : [39.5501, -105.7821, 7],
    "CT" : [41.6032, -73.0877,  9],
    "DE" : [38.9108, -75.5277,  9],
    "FL" : [27.6648, -81.5158,  7],
    "GA" : [32.1574, -82.9071,  7],
    "HI" : [19.8987, -155.6659, 8],
    "ID" : [44.0682, -114.7420, 7],
    "IL" : [40.6331, -89.3985,  7],
    "IN" : [40.5512, -85.6024,  7],
    "IA" : [42.0167, -93.1635,  7],
    "KS" : [39.0119, -98.4842,  7],
    "KY" : [37.8393, -84.2700,  7],
    "LA" : [30.5191, -91.5209,  7],
    "ME" : [45.2538, -69.4455,  7],
    "MD" : [39.0458, -76.6413,  7],
    "MA" : [42.4072, -71.3824,  9],
    "MI" : [44.2520, -85.4012,  7],
    "MN" : [46.7296, -94.6859,  7],
    "MS" : [32.3547, -89.3985,  7],
    "MO" : [39.5081, -91.5288,  7],
    "MT" : [46.8797, -110.3626, 6],
    "NE" : [41.4925, -99.9018,  7],
    "NV" : [38.8026, -116.4194, 7], 
    "NH" : [43.1939, -71.5724,  9],
    "NJ" : [40.0583, -74.4057,  9],
    "NM" : [34.9727, -105.0324, 7],
    "NY" : [40.7128, -74.0060,  7],
    "NC" : [35.7596, -79.0193,  7],  
    "ND" : [47.1164, -101.2996, 7],
    "OH" : [40.0640, -81.5290,  7],
    "OK" : [35.0078, -97.0929,  7],
    "OR" : [43.8041, -120.5542, 7],
    "PA" : [41.2033, -77.1945,  7],
    "RI" : [41.5801, -71.4774,  5],
    "SC" : [33.8361, -81.1637,  7],
    "SD" : [43.9695, -99.9018,  7],
    "TN" : [35.5175, -86.5804,  7],
    "TX" : [31.9686, -99.9018,  6],
    "UT" : [40.7607, -111.8939, 7],
    "VT" : [44.5588, -72.5778,  6],
    "MA" : [37.4316, -78.6569,  7],
    "VA" : [47.7511, -120.7401, 7],
    "WV" : [38.5976, -80.4549,  7],
    "WI" : [43.7844, -88.7879,  7],
    "WY" : [43.0760, -107.2903, 7]
}

const dropdown1 = document.getElementById("dropdown1")

for (state of Object.keys(dropdown_1_values)) {
    const dropdown_option = document.createElement("option")
    dropdown_option.class = "dropdown-option"
    dropdown_option.value = state
    dropdown_option.text = state

    dropdown1.add(dropdown_option)
}

const dropdown_2_values = [
    "All Airports",
    1500,
    1000,
    500,
    100,
    50,
    25,
    10
]

const dropdown2 = document.getElementById("dropdown2")

for (limit of dropdown_2_values) {
    const dropdown_option = document.createElement("option")

    dropdown_option.class = "dropdown-option"
    dropdown_option.value = limit
    dropdown_option.text = limit

    dropdown2.add(dropdown_option)
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    const graph = document.getElementById("graph-wrapper-active");
    
    if (graph) { document.getElementById("graph-cover-active").style.zIndex = -1; }
})

document.addEventListener("keyup", (event) => {
    for (graph of document.getElementsByClassName("graph-cover")) {
        graph.style.zIndex = ""
    }
})