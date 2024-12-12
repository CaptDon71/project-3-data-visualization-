const selector1UpdateURL = "http://127.0.0.1:5000/update_selected_area/"
const selector2UpdateURL = "http://127.0.0.1:5000/update_airport_limit/"

function onSelector1Change(event, updateMapLocation, updateMapBubbles, populateGraph1, populateGraph2, populateGraph3) {
    const updated_area = event.target.value;
    const viewType = getViewType()
    
    fetch(selector1UpdateURL + updated_area)

    selectedGraph = getGlobalSelectedGraph()

    if (viewType === "leaflet-view") {}
    else if (selectedGraph === 'graph1') { populateGraph1(true); }
    else if (selectedGraph === 'graph2') { populateGraph2(true); }
    else if (selectedGraph === 'graph3') { populateGraph3(true); }
    else {
        populateGraph1(true);
        populateGraph2(true);
        populateGraph3(true);
    }

    updateMapBubbles()
    updateMapLocation()
}

function onSelector2Change(event, updateMapBubbles, populateGraph1, populateGraph2, populateGraph3) {
    const update_limit = event.target.value
    const viewType = getViewType()
        
    fetch(selector2UpdateURL + update_limit)

    selectedGraph = getGlobalSelectedGraph()

    if (viewType === "leaflet-view") {}
    else if (selectedGraph === 'graph1') { populateGraph1(true); }
    else if (selectedGraph === 'graph2') { populateGraph2(true); }
    else if (selectedGraph === 'graph3') { populateGraph3(true); }
    else {
        populateGraph1(true);
        populateGraph2(true);
        populateGraph3(true);
    }

    updateMapBubbles()
}