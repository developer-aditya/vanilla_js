class UI {

    displayData(response) {

        $('#changeModal').modal('hide');

        const weatherLocation = document.getElementById("w-location");
        const weatherStatus = document.getElementById("w-status");
        const weatherString = document.getElementById("w-string");
        const weatherIcon = document.getElementById("w-icon");
        const weatherHumidity = document.getElementById("w-humidity");
        const weatherVisibility = document.getElementById("w-visibility");
        const weatherFeelslike = document.getElementById("w-feels-like");
        const weatherWind = document.getElementById("w-wind");

        weatherLocation.innerText = response.name + ' , ' + response.sys.country;
        weatherStatus.innerText = `${response.weather[0].description}`;
        weatherString.innerHTML = `${response.main.temp}&deg; C <br> <span class="lead">(Max: ${response.main.temp_max}&deg; C, Min: ${response.main.temp_min}&deg; C)</span>`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

        weatherHumidity.innerText = `Relative Humidity: ${response.main.humidity} %`
        weatherVisibility.innerText = `Visibility : ${response.visibility} m `
        weatherFeelslike.innerHTML = `Feels Like: ${response.main.feels_like}&deg C`
        weatherWind.innerHTML = `Wind Info:   ${response.wind.deg}&deg ,  ${response.wind.speed} m/s`

    }

    showError(error) {
        alert(error);
    }
}