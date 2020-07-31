const storage = new Storage();
storage.get();
const weather = new Weather(storage.city);
const ui = new UI();

if (storage.theme == 'light') {
    document.getElementById('theme').setAttribute('href', `css/light.min.css`);
    document.getElementById('themeChanger').setAttribute('fill', `#333`);
}
else {
    document.getElementById('themeChanger').setAttribute('fill', `#fff`);
    document.getElementById('theme').setAttribute('href', `css/dark.min.css`);
}

document.getElementById('themeChanger').addEventListener('click', (e) => {
    e.preventDefault();
    changeTheme();
});
document.addEventListener('DOMContentLoaded', getWeather);
document.getElementById('w-form').addEventListener('submit', (e) => changeLoc(e));
document.getElementById('w-change-loc').addEventListener('click', (e) => changeLoc(e));

function changeTheme() {
    if (document.getElementById('theme').getAttribute('href') === 'css/light.min.css') {
        document.getElementById('themeChanger').setAttribute('fill', `#fff`);
        document.getElementById('theme').setAttribute('href', `css/dark.min.css`);
        storage.setTheme('dark');
    }
    else {
        document.getElementById('theme').setAttribute('href', `css/light.min.css`);
        document.getElementById('themeChanger').setAttribute('fill', `#333`);
        storage.setTheme('light');
    }
}

function changeLoc(e) {
    e.preventDefault();
    weather.changeLocation(document.getElementById('city').value);
    getWeather();
    storage.setLocation(weather.city);
    $('#locModal').modal('hide');
    document.getElementById('city').value = '';
}

function getWeather() {
    weather.getWeather()
        .then(res => {
            ui.paint(res);
        })
        .catch(err => {
            console.error(err);
        });
}