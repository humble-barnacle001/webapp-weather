class Weather {
    constructor(city) {
        this.api_key = api_key;
        this.city = city;
    }

    async getWeather() {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.api_key}&q=${this.city}`);

        // const response = await fetch(`testresJSON/forecast0${Math.ceil(Math.random() * 9)}.json?${this.city}`);

        const responseData = await response.json();

        return {
            "location": responseData.location,
            "current": responseData.current,
            // "forecast": responseData.forecast.forecastday[0].day,
            // "astro": {
            //     "sunrise": responseData.forecast.forecastday[0].astro.sunrise,
            //     "sunset": responseData.forecast.forecastday[0].astro.sunset
            // }
        };
    }

    changeLocation(city) {
        this.city = city;
    }
}