const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/8df27438398c01e55d8bdcc4b0cb6da2/'+encodeURIComponent(lat)+','+encodeURIComponent(long)

    request({url: url, json: true}, (error, { body } = {}) => {
        if(error)
        {
            callback('can not connect', undefined)
        }
        else if(body.error)
        {
            callback('Can not find this location try another', undefined)
        }
        else
        {
            callback(undefined, {
                currentlySumarry: body.currently.summary,
                temprature: body.currently.temperature,
                rainProb: body.currently.precipProbability,
                dailySum: body.daily.summary,
                tz: body.timezone
            })
        }
    })

}

module.exports = forecast