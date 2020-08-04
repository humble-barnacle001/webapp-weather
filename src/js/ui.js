class UI {
    constructor() {
        this.mainDetails = document.getElementById('details');
        this.country = document.getElementById('w-location-country');
        this.location = document.getElementById('w-location');
        this.icon = document.getElementById('w-icon');
        this.desc = document.getElementById('w-desc');
        this.temp = document.getElementById('w-temp');
        this.tempUnit = document.querySelectorAll('.w-temp-unit');
        this.feels = document.getElementById('w-feels-like');
        this.pressure = document.getElementById('w-pressure');
        this.humidity = document.getElementById('w-humidity');
        this.wind = document.getElementById('w-wind');
        this.updated = document.getElementById('w-last-updated');
        this.alert = document.getElementById('top-alert');
        this.alertDesc = document.getElementById('top-alert-desc');
        this.details = document.getElementById('moreDetails');
        this.tempMin = document.getElementById('w-temp-min');
        this.tempMax = document.getElementById('w-temp-max');
        this.rain = document.getElementById('w-rain-percent');
        this.rainAmt = document.getElementById('w-rain-amt');
        this.uv = document.getElementById('w-uv');
        this.sunRise = document.getElementById('w-sunrise');
        this.sunSet = document.getElementById('w-sunset');
        this.moonRise = document.getElementById('w-moonrise');
        this.moonSet = document.getElementById('w-moonset');
        this.btn = document.getElementById('btnDetails');
    }

    paint(w, s) {
        this.removeDetails();
        this.mainDetails.classList.add('hide');
        this.country.textContent = w.location.country;
        this.location.textContent = `${w.location.name}, ${w.location.region}`;
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
        this.icon.setAttribute('src', w.current.condition.icon);
        this.desc.textContent = w.current.condition.text;
        this.changeTmpUnit(s.tempUnit, w);      //PROPERTY CHANGE
        this.pressure.textContent = w.current.pressure_mb;
        this.humidity.textContent = w.current.humidity;
        this.wind.textContent = `From the ${w.current.wind_dir} at ${w.current.wind_kph} KMPH upto speeds of ${w.current.gust_kph} KMPH`;
        this.updated.textContent = new Date(w.current.last_updated).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", hour12: true });
        this.mainDetails.classList.remove('hide');
    }

    paintDetails(e, w, s) {
        e.preventDefault();
        this.btn.classList.add('hide');
        this.changeTmpUnit(s.tempUnit, w);      //PROPERTY CHANGE
        this.rain.textContent = (w.forecast.forecastday)[0].day.daily_chance_of_rain;
        this.rainAmt.textContent = (w.forecast.forecastday)[0].day.totalprecip_mm;
        this.uv.textContent = (w.forecast.forecastday)[0].day.uv;
        this.sunRise.textContent = (w.forecast.forecastday)[0].astro.sunrise;
        this.sunSet.textContent = (w.forecast.forecastday)[0].astro.sunset;
        this.moonRise.textContent = (w.forecast.forecastday)[0].astro.moonrise;
        this.moonSet.textContent = (w.forecast.forecastday)[0].astro.moonset;
        this.details.classList.remove('hide');
        this.details.scrollIntoView(false);
    }

    removeDetails() {
        this.details.classList.add('hide');
        this.btn.classList.remove('hide');
        window.scrollTo(0, 0);
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
            this.tempMin.textContent = (w.forecast.forecastday)[0].day.mintemp_c;
            this.tempMax.textContent = (w.forecast.forecastday)[0].day.maxtemp_c;
            this.temp.textContent = w.current.temp_c;
            this.tempUnit.forEach(e => e.textContent = `C`);
            this.feels.textContent = w.current.feelslike_c;
            document.getElementById('unitC').checked = true;
        }
        else {
            this.tempMin.textContent = (w.forecast.forecastday)[0].day.mintemp_f;
            this.tempMax.textContent = (w.forecast.forecastday)[0].day.maxtemp_f;
            this.temp.textContent = w.current.temp_f;
            this.tempUnit.forEach(e => e.textContent = `F`);
            this.feels.textContent = w.current.feelslike_f;
            document.getElementById('unitF').checked = true;
        }
    }

    resetSrchUI() {
        document.getElementById('city').value = '';
        document.getElementById('srchSugg').innerHTML = '';
        document.getElementById('searchAlert').classList.add('hide');
    }
}