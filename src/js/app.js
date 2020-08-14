const storage = new Storage();
storage.get();
const weather = new Weather(storage.city);
const ui = new UI();
const ac = new Autocomplete();
let currentRES;
initial();

function initial() {
    const srchString = window.location.search.substring(window.location.search.indexOf('=') + 1).toLowerCase();
    if (srchString != '') {
        changeLoc(srchString);
        setTimeout(() => window.history.pushState(srchString, `Weather of ${srchString}`, window.location.pathname), 3000);
    }
    else {
        document.addEventListener('DOMContentLoaded', getWeather);
    }
    document.querySelector('.toTop').addEventListener('click', () => {
        document.querySelector('.content-wrapper').scrollTo(0, 0);
    });
    // document.getElementById('top-alert-closer').addEventListener('click', () => ui.closeAlert());
    document.getElementById('tmp-form').addEventListener('submit', changeTmpUnit);
    document.getElementById('tmpChangeBtn').addEventListener('click', changeTmpUnit);
    document.querySelector('.content-wrapper').addEventListener('scroll', () => {
        if (document.querySelector('.content-wrapper').scrollTop > 300) {
            document.querySelector('.toTop').style.opacity = '0.74';
        }
        else {
            document.querySelector('.toTop').style.opacity = '0';
        }
    });
    document.getElementById('city').addEventListener('keyup', () => ac.getResults());
    document.getElementById('srchSugg').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        ui.resetSrchUI();
        ac.getcityName(e.target.getAttribute('data-link'))
            .then(r => {
                changeLoc(`${r.location.latlon.latitude},${r.location.latlon.longitude}`);
            })
            .catch(err => console.warn(err));

    });
    document.querySelectorAll('.moreDetails').forEach((el) => el.addEventListener('click', (e) => {
        e.preventDefault();
        ui.paintDetails(currentRES, e.target.getAttribute('data-day'));
        showModal('locModal2');
    }));
}

function showModal(id) {
    window.location.href = `#${id}`;
}

function closeModal() {
    window.location.href = '#';
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
    showModal('locModal3');
    weather.getWeather()
        .then(res => {
            if (!res.error) {
                ui.paint(res, storage);
                currentRES = res;
                storage.setLocation(weather.city);
                setTimeout(() => closeModal(), 2000);
            }
            else {
                closeModal();
                ui.paintAlert(weather.city);
                if (e != 'object') {
                    changeLoc(prev);
                }
                weather.changeLocation(prev);
                storage.setLocation(prev);
            }
        })
        .catch(err => console.error(err));
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
    closeModal();
}

function getWeather() {
    showModal('locModal3');
    weather.getWeather()
        .then(res => {
            if (!res.error) {
                ui.paint(res, storage);
                currentRES = res;
                setTimeout(() => closeModal(), 1000);
            }
            else {
                closeModal();
                ui.paintAlert(weather.city);
            }
        })
        .catch(err => console.error(err));
}