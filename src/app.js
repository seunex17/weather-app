const geocode = require('./inc/geocode')
const forecast = require('./inc/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

//* Defined express paths
const rootPath = path.join(__dirname, '../public')

//* starting express server
const app = express()
const port = process.env.PORT || 2020

//* set up template engine
app.set('view engine', 'hbs')


//* Seting up static page
app.use(express.static(rootPath))

/**
 * =======================================================
 * * Seting up routes
 * =======================================================
 */

 //* index page
app.get('', (req, res) => {
    res.render('index')
})

//* Fetch the weather
app.get('/weather', (req, res) => {
    if(! req.query.address)
    {
        return res.send('Please provide and address')
    }
    const addr = req.query.address
    geocode(addr, (error, data) => {
        if(error)
        {
            return res.send({
                error: error
            })
        }
    
        //* pass the data to forecast
        forecast(data.lat, data.long, (error, forCast) => {
            //* check for error
            if(error)
            {
                return res.send({
                    error: error
                })
            }
    
            //* proceed
            //console.log(forCast)
            //console.log(data.location)
            res.send({
                summery: forCast.currentlySumarry,
                temps: forCast.temprature,
                rainProb: forCast.rainProb,
                dailySum: forCast.dailySum,
                tz: forCast.tz,
                location: data.location
            })
            
        })
    })
})

//* 404 error pages
app.get('*', (req, res) => {
    res.send('Error page not found')
})

app.listen(port, () => {
    console.log('Starting Zubdev Weather sever ' + port)
})