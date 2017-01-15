const requestPromise = require('request-promise');
const fetch = requestPromise.defaults({jar: true});
const { weatherAPIKey } = require('./config.js');

const fetcher = (options) => {
    return fetch(options);
};


class Weather {

    constructor(receiveCallback) {
        this.receiveCallback = receiveCallback;
    }

    commandCurrentWeather ()  {
        return this.receiveCallback('Your city? ')
            .then(city => {
                if (city !== '') {


                    const urlValue = `http://api.openweathermap.org/data/2.5/weather?APPID=${weatherAPIKey}&q=${encodeURIComponent(city)}&cnt=1`;

                    fetcher(urlValue)
                        .then(source => {
                            const data = JSON.parse(source);
                            const currentTemperature = this.getTemperature(data);

                            console.log('Current temperature: ', currentTemperature);
                        });
                }
            })
    }

    getTemperature (data) {
        return this.kelvinToCelsius(data.main.temp);
    }

    kelvinToCelsius (value) {
        return value - 273.15;
    }

    commandForecastWeather () {
        return this.receiveCallback('Your city? ')
            .then(city => {
                if (city !== '') {


                    const urlValue = `http://api.openweathermap.org/data/2.5/forecast?APPID=${weatherAPIKey}&q=${encodeURIComponent(city)}&cnt=1`;

                    fetcher(urlValue)
                        .then(source => {
                            const data = JSON.parse(source);

                            console.log(data);
                            // const currentTemperature = getTemperature(data);
                            //
                            // console.log('Current temperature: ', currentTemperature);
                        });
                }
            })
    };

}

module.exports = Weather;
