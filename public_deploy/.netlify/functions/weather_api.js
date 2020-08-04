const apiKey = process.env.WEATHER_API_KEY;
const uri = process.env.WEATHER_URI;
const fetch = require('node-fetch');
const { getCode, getName } = require('country-list');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        try {
            if (event.headers['sec-fetch-dest'] === 'document' || event.headers['sec-fetch-site'] === 'cross-site' || event.headers['sec-fetch-mode'] === 'navigate' || event.headers['sec-fetch-site'] === 'none') {
                console.warn("Illegal Attempt from: ", event.headers.referer);
                console.log("Fetch Destination: ", event.headers['sec-fetch-dest']);
                console.log("Fetch site: ", event.headers['sec-fetch-site']);
                console.log("Client IP: ", event.headers['client-ip']);
                console.log("Fetch Type: ", event.headers['sec-fetch-mode']);
                console.log(`User Country: ${event.headers['x-country']}, ${getName(event.headers['x-country'])}`);
                console.warn("--------------------------------------------");
                return {
                    statusCode: 403,
                    body: `Attempt to illegally access data from IP: ${event.headers['client-ip']}!!! Location Detected: ${getName(event.headers['x-country'])}!! Logging data to server!`
                }
            }

            let q = event.queryStringParameters.q;
            if (q == '') {
                q = event.headers['client-ip'];
                const lres = await fetch(`https://apility-io-ip-geolocation-v1.p.rapidapi.com/${q}`,
                    {
                        "method": "GET",
                        "headers":
                        {
                            "x-rapidapi-host": "apility-io-ip-geolocation-v1.p.rapidapi.com",
                            "x-rapidapi-key": "ef8be487a0mshf379a8c1c9f5a42p1237d5jsn44c5375c5416",
                            "accept": "application/json"
                        }
                    });
                const lrj = await lres.json();
                const llr = await fetch(`https://api.teleport.org/api/cities/geonameid:${lrj.ip.city_geoname_id}`);
                const latlong = await llr.json();
                console.log(latlong.location.latlon);
                q = `${latlong.location.latlon.latitude},${latlong.location.latlon.longtitude}`;
                console.log(q);
            }
            const response = await fetch(`${uri}?q=${q}&key=${apiKey}`);
            const data = await response.json();
            return {
                statusCode: response.status,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            };
        }
        catch (err) {
            console.log("invocation error:", err);
            return {
                statusCode: 500,
                body: err.message
            };
        }
    }
    else {
        return {
            statusCode: 403,
            body: "Only GET requests from secure sites allowed!!!"
        }
    }
}