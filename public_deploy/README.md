[![Netlify Status](https://api.netlify.com/api/v1/badges/d8af29e2-20cf-435c-ad05-f65cfe96823a/deploy-status)](https://app.netlify.com/sites/webapp-weather/deploys)

## This is the deployed folder
This folder is deployed to a [shared hosting service - Netlify](https://www.netlify.com) and the api results are obtained using *AWS lambda* function to **hide** api key.

# Build
## Command on build console (without NPM)
`npm i node-fetch; npm i country-list;`

## Environment Variables required
- `WEATHER_API_KEY` - for the API key
- `WEATHER_URI` - the URL of the service provider

# Deploy **URL**
[Weather Viewer](https://webapp-weather.netlify.app)

# Issues and Contributions
* Raise issues or suggest changes in the [issues](https://github.com/humble-barnacle001/webapp-weather/issues) section
* To contribute or help fork the repository and create a [pull request](https://github.com/humble-barnacle001/webapp-weather/pulls)