class Weather {

    async getWeatherData(city, country) {
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=e5d245ea1ddfd34beb2aee6c521d17ea`);

        if (weatherRes.ok === true) {
            const weatherData = await weatherRes.json();
            return weatherData;
        }
        else {
            await Promise.reject(new Error(`Something Went Very Wrong: ${weatherRes.status}`));
        }
    }

}