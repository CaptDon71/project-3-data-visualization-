const selector1UpdateURL = "http://127.0.0.1:5000/update_selected_area/"
const selector2UpdateURL = "http://127.0.0.1:5000/update_airport_limit/"

function onSelector1Change(event, callback1, callback2) {
    const updated_area = event.target.value;
    
    fetch(selector1UpdateURL + updated_area)
    callback2()
    callback1()
}

function onSelector2Change(event, callback1) {
    const update_limit = event.target.value
        
    fetch(selector2UpdateURL + update_limit)
    callback1()
}