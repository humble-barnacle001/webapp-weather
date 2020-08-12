const storage = new Storage();
storage.get();
const weather = new Weather(storage.city);
const ui = new UI();
const ac = new Autocomplete();
let currentRES;
let loader = false;
initial();

function initial() {
    const srchString = window.location.search.substring(window.location.search.indexOf('=') + 1).toLowerCase();
    if (srchString != '') {
        changeLoc(srchString);
        setTimeout(() => window.history.pushState(srchString, `Weather of ${srchString}`, '/'), 3000);
    }
    else {
        document.addEventListener('DOMContentLoaded', getWeather);
    }
    if (storage.theme == 'light') {
        lightThemeSet();
    }
    else {
        darkThemeSet();
    }

    document.getElementById('themeChanger').addEventListener('click', (e) => {
        e.preventDefault();
        changeTheme();
    });
    document.querySelector('.toTop').addEventListener('click', () => window.scrollTo(0, 0));
    document.getElementById('top-alert-closer').addEventListener('click', () => ui.closeAlert());
    document.getElementById('tmp-form').addEventListener('submit', changeTmpUnit);
    document.getElementById('tmpChangeBtn').addEventListener('click', changeTmpUnit);
    document.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.querySelector('.toTop').style.opacity = '0.74';
        }
        else {
            document.querySelector('.toTop').style.opacity = '0';
        }
    });
    document.getElementById('city').addEventListener('keyup', () => ac.getResults());
    document.getElementById('srchSugg').addEventListener('click', (e) => {
        e.preventDefault();
        ac.getcityName(e.target.getAttribute('data-link'))
            .then(r => changeLoc(`${r.location.latlon.latitude},${r.location.latlon.longitude}`))
            .catch(err => console.warn(err));

    });
    $('#locModal').on('hidden.bs.modal', () => ui.resetSrchUI());
    document.querySelectorAll('.moreDetails').forEach((el) => el.addEventListener('click', (e) => {
        e.preventDefault();
        ui.paintDetails(currentRES, e.target.getAttribute('data-day'));
        $('#locModal2').modal('show');
    }));
    $('#locModal3').on('shown.bs.modal', () => {
        if (!loader)
            $('#locModal3').modal('hide');
    });
}

function changeTheme() {
    if (document.getElementById('theme').getAttribute('href') === 'css/light.min.css') {
        darkThemeSet();
    }
    else {
        lightThemeSet();
    }
}

function darkThemeSet() {
    document.getElementById('theme').setAttribute('href', `css/dark.min.css`);
    document.getElementById('themeChanger').setAttribute('fill', `#fff`);
    storage.setTheme('dark');
}

function lightThemeSet() {
    document.getElementById('theme').setAttribute('href', `css/light.min.css`);
    document.getElementById('themeChanger').setAttribute('fill', `#333`);
    storage.setTheme('light');
}

function changeLoc(e) {
    let prev = weather.city;
    if (typeof e == 'object') {
        e.preventDefault();
        weather.changeLocation(document.getElementById('city').value);
    }
    else {
        weather.changeLocation(e);
    }
    $('#locModal3').modal('show');
    loader = true;
    weather.getWeather()
        .then(res => {
            if (!res.error) {
                ui.paint(res, storage);
                currentRES = res;
                storage.setLocation(weather.city);
            }
            else {
                ui.paintAlert(weather.city);
                if (e != 'object') {
                    changeLoc(prev);
                }
                weather.changeLocation(prev);
                storage.setLocation(prev);
            }
            loader = false;
            $('#locModal3').modal('hide');
        })
        .catch(err => console.error(err));
    $('#locModal').modal('hide');
}

function changeTmpUnit() {
    if (document.getElementById('unitC').checked) {
        ui.changeTmpUnit('C', currentRES);
        storage.setTempUnit('C');
    }
    else {
        ui.changeTmpUnit('F', currentRES);
        storage.setTempUnit('F');
    }
    $('#locModal1').modal('hide');
}

function getWeather() {
    $('#locModal3').modal('show');
    loader = true;
    weather.getWeather()
        .then(res => {
            if (!res.error) {
                ui.paint(res, storage);
                currentRES = res;
            }
            else {
                ui.paintAlert(weather.city);
            }
            loader = false;
            $('#locModal3').modal('hide');
        })
        .catch(err => console.error(err));
}