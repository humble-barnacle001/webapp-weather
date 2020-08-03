const storage = new Storage();
storage.get();
const weather = new Weather(storage.city);
const ui = new UI();
let currentRES;
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
        lightThemeSet()
    } else {
        darkThemeSet()
    }
    document.getElementById('themeChanger').addEventListener('click', (e) => {
        e.preventDefault();
        changeTheme()
    });
    document.querySelector('.toTop').addEventListener('click', () => window.scrollTo(0, 0));
    document.getElementById('top-alert-closer').addEventListener('click', () => ui.closeAlert());
    document.getElementById('w-form').addEventListener('submit', changeLoc);
    document.getElementById('w-change-loc').addEventListener('click', changeLoc);
    document.getElementById('btnDetails').addEventListener('click', (e) => ui.paintDetails(e, currentRES, storage));
    document.getElementById('btnClsDetails').addEventListener('click', () => ui.removeDetails());
    document.getElementById('tmp-form').addEventListener('submit', changeTmpUnit);
    document.getElementById('tmpChangeBtn').addEventListener('click', changeTmpUnit);
    document.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.querySelector('.toTop').style.opacity = '0.74'
        } else {
            document.querySelector('.toTop').style.opacity = '0'
        }
    })
}

function changeTheme() {
    if (document.getElementById('theme').getAttribute('href') === 'css/light.min.css') {
        darkThemeSet()
    } else {
        lightThemeSet()
    }
}

function darkThemeSet() {
    document.getElementById('theme').setAttribute('href', `css/dark.min.css`);
    document.getElementById('themeChanger').setAttribute('fill', `#fff`);
    storage.setTheme('dark')
}

function lightThemeSet() {
    document.getElementById('theme').setAttribute('href', `css/light.min.css`);
    document.getElementById('themeChanger').setAttribute('fill', `#333`);
    storage.setTheme('light')
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
        })
        .catch(err => console.error(err));
    $('#locModal').modal('hide');
    document.getElementById('city').value = ''
}

function changeTmpUnit() {
    if (document.getElementById('unitC').checked) {
        ui.changeTmpUnit('C', currentRES);
        storage.setTempUnit('C')
    } else {
        ui.changeTmpUnit('F', currentRES);
        storage.setTempUnit('F')
    }
    $('#locModal1').modal('hide')
}

function getWeather() {
    weather.getWeather().then(res => {
        if (!res.error) {
            ui.paint(res, storage);
            currentRES = res
        } else {
            ui.paintAlert(weather.city)
        }
    }).catch(err => console.error(err));
}