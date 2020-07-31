class UI {
    constructor() {
        this.country = document.getElementById('w-location-country');
        this.location = document.getElementById('w-location');
        this.icon = document.getElementById('w-icon');
        this.desc = document.getElementById('w-desc');
        this.temp = document.getElementById('w-temp');
        this.tempUnit = document.getElementById('w-temp-unit');
        this.feels = document.getElementById('w-feels-like');
        this.feelsUnit = document.getElementById('w-feels-like-unit');
        this.pressure = document.getElementById('w-pressure');
        this.humidity = document.getElementById('w-humidity');
        this.wind = document.getElementById('w-wind');
    }

    paint(w) {
        this.country.textContent = `${w.location.country}`;
        this.location.textContent = `${w.location.name}, ${w.location.region}`;
        this.icon.setAttribute('src', w.current.condition.icon);
        this.desc.textContent = w.current.condition.text;
        this.temp.textContent = `Temperature: ${w.current.temp_c}`;   //CHANGEABLE PROPERTY SET
        this.tempUnit.textContent = `C`;   //CHANGEABLE PROPERTY SET
        this.feels.textContent = `Feels Like: ${w.current.feelslike_c}`;  //CHANGEABLE PROPERTY SET
        this.feelsUnit.textContent = `C`;   //CHANGEABLE PROPERTY SET
        this.pressure.textContent = `Atmospheric Pressure: ${w.current.pressure_mb}mb`;
        this.humidity.textContent = `Humidity: ${w.current.humidity}%`;
        this.wind.textContent = `Wind: From the ${w.current.wind_dir} at ${w.current.wind_kph}kmph upto ${w.current.gust_kph}kmph`; //PREFERENCE CHANGEABLE
    }
}