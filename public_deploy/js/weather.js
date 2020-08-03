class Weather {
    constructor(t) {
        this.city = t
    }
    async getWeather() {
        return fetch(`.netlify/functions/weather_api?q=${this.city}`, {
            method: "GET"
        }).then(t => t.json()).catch(t => console.error(t))
    }
    changeLocation(t) {
        this.city = t
    }
}