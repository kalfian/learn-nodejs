const request = require("request")

const forecast = ({ latitude: lat, longitude: long } = {}, callback) => {
    const url = 'https://api.darksky.net/forecast/335a20bb5fe784b6177f7af70d29154e/' + lat + ',' + long

    request({url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to weather service [" + error + "]", undefined)
        } else if (body.error) {
            callback("unable to find location", undefined)
            console.log()
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast