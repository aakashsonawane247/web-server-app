const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aakash Sonawane'
    })
})


//about page 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aakash Sonawane'
    })
})
app.get('/about/*', (req, res) => {
    res.render('404',{
        title : '404',
        name:'Aakash Sonawane',
        errorMessage:'about article not found'
    })
})


//help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Aakash Sonawane'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        title : '404',
        name:'Aakash Sonawane',
        errorMessage:'help article not found'
    })
})

//weather home page
app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error:'You must have to provoide a address item'
        })

    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{  // ' ={} ' in case the address=! (not provoided)
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
    
    // else{
    //         //console.log(req.query)
    //         res.send({
    //             forecast: 'It is snowing',
    //             location: 'Philadelphia',
    //             address: req.query.address
    //         })
    // }
    
    
    
    
})



//products
app.get('/products', (req, res) => {

    if(!req.query.search){
        res.send({
            error:'You must have to provoide a search item'
        })

    }else{
            console.log(req.query)
            res.send({
                 products:[]
            })
    }
})



app.get('*', (req, res) => {
    res.render('404',{
        title : '404',
        name:'Aakash Sonawane',
        errorMessage:'page not found'
    })
})

app.listen(2000, () => {
    console.log('Server is up on port 2000.')
})