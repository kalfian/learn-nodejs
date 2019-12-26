const geocode = require("./utils/geocode")
const forecast = require('./utils/forecast')

geocode('los angeles', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        forecast(data, (error, {
            temperature,
            precipProbability
        }) => {
            if (error) {
                console.log(error)
            } else {
                console.log("it currently " + temperature + " degrees out. there is a " + precipProbability * 100 + "% chance of rain.")
            }
        })
    }
})