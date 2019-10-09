const request = require('request')

const forecast = (latitude,longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/47794a7a7000d72c3bacba862b3589a6/' + latitude + ',' + longitude
 
    request({ url: url, json: true }, (error,response) => {
        if(error){
            callback('unable to connect to weather services!',undefined)
        }else if(response.body.error){
            callback('unable to find location, Try another service',undefined) 
        }else{
                callback(undefined, response.body.daily.data[0].summary +' It is currentely '+ response.body.currently.temperature +' degree out. There is ' +response.body.currently.precipProbability +'% chance of rain.')
        }
     
     })
}


module.exports = forecast
