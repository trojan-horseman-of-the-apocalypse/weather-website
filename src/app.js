const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home',
    name: 'Haydn Welch'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Haydn Welch'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Haydn Welch',
    message: 'It appears you may need a hand?'
  })
})

app.get('/weather', (req, result) => {
  const address = req.query.address
  if (!address) {
    return result.send({
      error: 'You must provide an address!'
    });
  }
  geocode(address, (err, { lat, lon, location } = {}) => err ?
    result.send(err) :
    forecast(lat, lon, location, (err, res) => err ?
      result.send(err) :
        result.send({
          location,
          address,
          forecast: res
        })
    )
  )
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Haydn Welch',
    message: 'Help Article Not Found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Haydn Welch',
    message: 'Page Not Found'
  })
})

app.listen(port, () => {
  console.log(`Server has started, listening on port ${port}`)
})