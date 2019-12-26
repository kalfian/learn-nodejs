const request = require("request")

const forecast = ({
    latitude: lat,
    longitude: long
}, callback) => {
    const url = 'https://api.darksky.net/forecast/335a20bb5fe784b6177f7af70d29154e/' + lat + ',' + long

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("unable to connect to weather service [" + error + "]", undefined)
        } else if (response.body.error) {
            callback("unable to find location", undefined)
            console.log()
        } else {
            const data = response.body.currently
            callback(undefined, data)
        }
    })
}

module.exports = forecast