class Weather {
    constructor(city) {
        this.api_key = api_key;
        this.city = city;
    }

    async getWeather() {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.api_key}&q=${this.city}`);
        const responseData = await response.json();
        return responseData;
    }

    changeLocation(city) {
        this.city = city;
    }
}