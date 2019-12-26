const https = require('https')
const url = 'https://api.darksky.net/forecast/335a20bb5fe784b6177f7af70d29154e/40,-75'

const request = https.request(url, (res) => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk.toString()
    })

    res.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.end()