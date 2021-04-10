const weather = new Weather();
const ui = new UI();
const storage = new Storage();




// GET Data from API And display on View
function getThenDisplay(city, country) {
    weather.getWeatherData(city, country)
        .then(res => ui.displayData(res))
        .catch(err => ui.showError(err));
}



// EVENTS LISTENERS

document.addEventListener('DOMContentLoaded', (e) => {
    // Get data from Local Storage
    const city = storage.getItemFromLS('city');
    const country = storage.getItemFromLS('country');

    if (city !== null) {
        getThenDisplay(city, country);
    }
});


document.getElementById("location-form").addEventListener('submit', function (e) {
    const city = e.target[0].value;
    const country = e.target[1].value;

    if (city !== "") {
        storage.setItemToLS('city', city);
        storage.setItemToLS('country', country);
        getThenDisplay(city, country);
    }
    else {
        alert("Please Enter City Name");
    }
    e.preventDefault();
});
