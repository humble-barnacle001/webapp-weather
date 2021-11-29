class Weather {
    constructor(city) {
        this.city = city;
    }

    async getWeather() {
        return fetch(`.netlify/functions/weather_api?q=${this.city}`, {
            method: "GET",
        })
            .then((t) => t.json())
            .catch((t) => console.error(t));
    }

    changeLocation(city) {
        this.city = city;
    }
}
