class Storage {
    constructor() {
        this.city;
        this.tempUnit;
    }
    get() {
        if (localStorage.getItem('city')) {
            this.city = localStorage.getItem('city');
        }
        else {
            this.city = "";
            this.setLocation(this.city);
        }
        if (localStorage.getItem('tempUnit')) {
            this.tempUnit = localStorage.getItem('tempUnit');
        }
        else {
            this.tempUnit = "C";
            this.setTempUnit(this.tempUnit);
        }
    }
    setLocation(city) {
        this.city = city;
        localStorage.setItem('city', city);
    }
    setTempUnit(unit) {
        this.tempUnit = unit;
        localStorage.setItem('tempUnit', unit);
    }
}