const update_selected_area_url = "http://127.0.0.1:5000/update_selected_area/"

function onSelectorChange(event, callback) {
    const updated_area = event.target.value;
    fetch(update_selected_area_url + updated_area)
    callback()
}