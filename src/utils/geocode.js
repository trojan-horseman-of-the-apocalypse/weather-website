const request = require('request')

module.exports =  geocode = (location, callback) => {
  request({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiaGF5ZG53ZWxjaDEyMyIsImEiOiJja2Ztc2YzY3gwOGh3MnNwbG5jZWljNjAyIn0.QNF7k208mIeFlekrlaTFXA&limit=1`,
    json: true
  }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location service', undefined)
    } else if (body.message === 'Not Found') {
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}