const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')
const { request } = require('http')

const app = express()

const port = process.env.PORT || 3000


const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDir))
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

 app.get('', (req, res)=>{
    res.render('index',{
     title : 'Weather',
     Name : 'Shekhar'
  })
})

app.get('/about', (req, res)=>{
  res.render('about',{
   title : 'Learn About me!',
   Name : 'Shekhar'
})
})

app.get('/help', (req, res)=>{
  res.render('help',{
   title : 'Get all help here !',
   Name : 'Shekhar'
})
})

// app.get('/help', (req, res)=>{
  //   res.send([{
  //     "name": "shekhar",
  //     "age" : "30"
  //  }])
  //  })

app.get('/weather', (req, res)=>{
    
  if(!req.query.address){
     return res.send({
       error : 'address is not provided'
     })
  }

  geocode(req.query.address, (error, {latitude, longitude, placeName}= {})=>{
    if (error){
        return res.send({ error})
    }   

    forecast(latitude, longitude, (error, forecastData)=>{
        if (error ){
          res.send({ error  })
        }
        res.send([{
          forecast : forecastData.description,
          temperature : forecastData.temperature,
          location :placeName,
          address : req.query.address
        }])
    })
})

  // res.send([{
  //  "forecast" : "Its lovely outside, 15 deg!",
  //  "location" : "London",
  //  "address" : req.query.address,

  // }])
})

app.get('/help/*', (req, res) =>{
  res.render('PageNotFound', {
    title :' Help Document not found',
    Name : 'Shekhar V',
    errorText : 'for help error details details contact help-admin'
 })
 })

app.get('*', (req, res) =>{

 res.render('PageNotFound', {
    title :' This is a 404 page',
    Name : 'Shekhar V',
    errorText : 'For error details contact admin'
 })
})

 app.listen(port, ()=>{
     console.log('server is up and running on port= ' + port)
 })