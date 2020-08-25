class Weather {
    constructor(city) {
        this.api_key = api_key;
        this.city = city;
    }

    async getWeather() {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.api_key}&q=${this.city == '' ? 'auto:New Delhi' : this.city}&days=3`);
        // const response = await fetch(`testresJSON/forecast0${Math.ceil(Math.random() * 9)}.json?q=${this.city}`);
        //USED FOR TESTING PURPOSES WITH DOWNLOADED JSON FILES WITH "Live Server"
        const responseData = await response.json();
        return responseData;
    }

    changeLocation(city) {
        this.city = city;
    }
}