const request = require('request')
const moment = require('moment')

module.exports = forecast = (lat, lon, location,  callback) => {
  request({
    url: `http://api.weatherstack.com/current?access_key=3bff97f9a52a0075c4d32fd989473da4&query=${lat}, ${lon}`,
    json: true
  }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
        const data = body.current
        const time = body.current.observation_time.split(':')
        time[0] = (parseInt(body.current.observation_time.split(':')[0]) + parseInt(body.location.utc_offset)).toString()
        callback(undefined, `As of ${time.toString().replace(',', ':')} GMT, the forecast is ${data.weather_descriptions[0].toLowerCase()}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike}.`)
    }
  })
}

