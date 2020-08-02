const apiKey = process.env.WEATHER_API_KEY;
const fetch = require('node-fetch');
exports.handler = async (event, context) => {
    try {
        const q = event.queryStringParameters.q || 'auto:New Delhi';
        try {
            console.log("Fetch Destination: ", event.headers['sec-fetch-dest']);
            console.log("Fetch site: ", event.headers['sec-fetch-site']);
            console.log("Client IP: ", event.headers['client-ip']);
            console.log("Fetch Type: ", event.headers['sec-fetch-mode']);
            console.log("User Country: ", event.headers['x-country']);
        }
        catch (e) {
            console.error("IN VARIABLES PARSING: ", e);
        }


        if (!q) {
            return {
                statusCode: 400,
                body: "Missing query parameters"
            };
        }
        const uri = `https://api.weatherapi.com/v1/forecast.json?q=${q}`;
        const response = await fetch(`${uri}&key=${apiKey}`);
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
            body: "err.message"
        };
    }
}