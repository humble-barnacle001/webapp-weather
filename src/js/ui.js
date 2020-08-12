class UI {
    constructor() {
        this.mainDetails = document.getElementById('details');
        this.country = document.getElementById('w-location-country');
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.temp = document.getElementById('w-temp');
        this.tempUnit = document.querySelectorAll('.w-temp-unit');
        this.feels = document.getElementById('w-feels-like');
        this.humidity = document.getElementById('w-humidity');
        this.wind = document.getElementById('w-wind');
        this.updated = document.getElementById('w-last-updated');
        this.alert = document.getElementById('top-alert');
        this.alertDesc = document.getElementById('top-alert-desc');
        this.detDay = document.getElementById('w-det-day');
        this.detWind = document.getElementById('w-det-wind');
        this.detUV = document.getElementById('w-det-uv');
        this.detVis = document.getElementById('w-det-vis');
        this.detSR = document.getElementById('w-det-sr');
        this.detSS = document.getElementById('w-det-ss');
        this.detMR = document.getElementById('w-det-mr');
        this.detMS = document.getElementById('w-det-ms');
        this.whichDay = ['today', 'tomorrow', 'day after tomorrow'];
    }

    paint(w, s) {
        this.mainDetails.classList.add('hide');
        this.country.textContent = w.location.country;
        this.location.textContent = `${w.location.name}${w.location.region === "" ? '' : `, ${w.location.region}`}`;
        if (window.innerWidth < 400) {
            if (this.location.textContent.length > 17) {
                this.location.classList.add('h4');
                this.location.classList.remove('h2');
            }
            else {
                this.location.classList.remove('h4');
                this.location.classList.add('h2');
            }
        }
        this.desc.textContent = w.current.condition.text;
        this.changeTmpUnit(s.tempUnit, w);      //PROPERTY CHANGE
        this.humidity.textContent = w.current.humidity;
        this.wind.textContent = `From the ${w.current.wind_dir} at ${w.current.wind_kph} KMPH upto speeds of ${w.current.gust_kph} KMPH`;
        this.updated.textContent = new Date(w.current.last_updated).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", hour12: true });
        this.mainDetails.classList.remove('hide');
        for (let i = 0; i < 3; i++) {
            document.getElementById(`w-rep-${i}`).setAttribute('src', (w.forecast.forecastday)[i].day.condition.icon);
            document.getElementById(`w-desc-${i}`).textContent = (w.forecast.forecastday)[i].day.condition.text;
            document.getElementById(`w-rain-amt-${i}`).textContent = (w.forecast.forecastday)[i].day.totalprecip_mm;
            document.getElementById(`w-rain-percent-${i}`).textContent = (w.forecast.forecastday)[i].day.daily_chance_of_rain;
            document.getElementById(`w-humidity-${i}`).textContent = (w.forecast.forecastday)[i].day.avghumidity;
        }
    }

    paintDetails(w, i) {
        this.detDay.textContent = this.whichDay[i];
        this.detWind.textContent = (w.forecast.forecastday)[i].day.maxwind_kph;
        this.detUV.textContent = (w.forecast.forecastday)[i].day.uv;
        this.detVis.textContent = (w.forecast.forecastday)[i].day.avgvis_km;
        this.detSR.textContent = (w.forecast.forecastday)[i].astro.sunrise;
        this.detSS.textContent = (w.forecast.forecastday)[i].astro.sunset;
        this.detMR.textContent = (w.forecast.forecastday)[i].astro.moonrise;
        this.detMS.textContent = (w.forecast.forecastday)[i].astro.moonset;
    }

    paintAlert(loc) {
        this.alertDesc.innerHTML = `No city named "${loc}" found!!<br>Reset to previous viewed city!`;
        this.alert.classList.remove('hide');
        setTimeout(() => this.closeAlert(), 5000);
    }

    closeAlert() {
        this.alert.classList.add('hide');
    }

    changeTmpUnit(u, w) {
        if (u === 'C') {
            this.temp.textContent = w.current.temp_c;
            this.tempUnit.forEach(e => e.textContent = `C`);
            this.feels.textContent = w.current.feelslike_c;
            document.getElementById('unitC').checked = true;
            for (let i = 0; i < 3; i++) {
                document.getElementById(`w-temp-avg-${i}`).textContent = (w.forecast.forecastday)[i].day.avgtemp_c;
                document.getElementById(`w-temp-min-${i}`).textContent = (w.forecast.forecastday)[i].day.mintemp_c;
                document.getElementById(`w-temp-max-${i}`).textContent = (w.forecast.forecastday)[i].day.maxtemp_c;
            }
        }
        else {
            this.temp.textContent = w.current.temp_f;
            this.tempUnit.forEach(e => e.textContent = `F`);
            this.feels.textContent = w.current.feelslike_f;
            document.getElementById('unitF').checked = true;
            for (let i = 0; i < 3; i++) {
                document.getElementById(`w-temp-avg-${i}`).textContent = (w.forecast.forecastday)[i].day.avgtemp_f;
                document.getElementById(`w-temp-min-${i}`).textContent = (w.forecast.forecastday)[i].day.mintemp_f;
                document.getElementById(`w-temp-max-${i}`).textContent = (w.forecast.forecastday)[i].day.maxtemp_f;
            }
        }
    }

    resetSrchUI() {
        document.getElementById('city').value = '';
        document.getElementById('srchSugg').innerHTML = '';
        document.getElementById('searchAlert').classList.add('hide');
    }
}