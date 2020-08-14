class Autocomplete {
    constructor() {
        this.srchQ = document.getElementById('city');
        this.suggUI = document.getElementById('srchSugg');
        this.alert = document.getElementById('searchAlert');
    }
    getResults() {
        if (this.srchQ.value != '') {
            this.suggestion(this.srchQ.value)
                .then(r => {
                    let output = '';
                    if (r.count > 0) {
                        this.srchQ.classList.remove('is-invalid');
                        this.alert.classList.add('hide');
                        r._embedded['city:search-results'].forEach(c => {
                            output += `<p class="m-0 p-10 border rounded" style="white-space:nowrap; overflow: hidden;" data-link="${c._links['city:item'].href}">${c.matching_full_name}</p>`;
                        });
                    }
                    else {
                        output = ``;
                        this.srchQ.classList.add('is-invalid');
                        this.alert.classList.remove('hide');
                    }
                    this.suggUI.innerHTML = output;
                })
                .catch((err) => console.warn(`AUTO COMPLETE DIDN'T WORK ${err}`));
        }
        else {
            this.suggUI.innerHTML = '';
        }
    }

    async suggestion(query) {
        const res = await fetch(`https://api.teleport.org/api/cities/?search=${query}`);
        return await res.json();
    }

    async getcityName(link) {
        const res = await fetch(link);
        return await res.json();
    }
}