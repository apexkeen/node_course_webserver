const request = require('request')

const forecast = (latitude, longitude, callback)=>{

    const weatherUrl =  'http://api.weatherstack.com/current?access_key=6319cbe7f4065e28dac70af8ecc0735f&query='+latitude+','+ longitude+''
    console.log('WEATHER URL='+ weatherUrl )
    request({url:weatherUrl , json:true}, (error, response)=>{
    
        if (error) {
           callback('unable to connect to internet', undefined)
       } else if (response.body.error) {
          callback('unable to find location via forecast API', undefined)
       } else {
           callback(undefined, {
               description: response.body.current.weather_descriptions[0],
               temperature : response.body.current.temperature ,
               humidity : response.body.current.humidity
           })
            //console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    
    })
    
    }

    module.exports = forecast