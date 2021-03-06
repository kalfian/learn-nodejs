const request = require("request")
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoia2FsZmlhbiIsImEiOiJjazQyNXo0MXUwMWNpM2xwMmxscm1hcng1In0.LeLdVZTYSSgqJKHt-e2Lxg&limit=1"
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            return callback('Unable to connect to location service', undefined)
        } else if (response.body.features.length === 0) {
            return callback('Unable to find location. Try another search', undefined)
        }

        callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    })
}

module.exports = geocode