class Storage {
    constructor() {
        this.city;
        this.tempUnit;
        this.theme;
    }
    get() {
        if (localStorage.getItem('city')) {
            this.city = localStorage.getItem('city');
        }
        else {
            this.city = "auto:New Delhi";
            this.setLocation(this.city);
        }
        if (localStorage.getItem('tempUnit')) {
            this.tempUnit = localStorage.getItem('tempUnit');
        }
        else {
            this.tempUnit = "C";
            this.setTempUnit(this.tempUnit);
        }
        if (localStorage.getItem('theme')) {
            this.theme = localStorage.getItem('theme');
        }
        else {
            this.theme = "light";
            this.setTheme(this.theme);
        }
    }
    setLocation(city) {
        localStorage.setItem('city', city);
    }
    setTempUnit(unit) {
        localStorage.setItem('tempUnit', unit);
    }
    setTheme(theme) {
        localStorage.setItem('theme', theme);
    }
}