const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2V1bmV4IiwiYSI6ImNrNHQyYnlheDByY3gzZXFkemluOTV4d3QifQ.RoYvXPXRHJyYbtixivvBHg&limit=1'
    request({url: url, json: true}, (error, { body } = {}) => {
        //* Let check if there is error in connecting
        if(error)
        {
            return callback('You are not connect to Internet', undefined)
        }
        //* Let check if number of research is zero
        if(body.features.length === 0)
        {
            return callback('Can not fined this location please try another', undefined)
        }

        //* if all processing went well proceed geting the data
        callback(undefined, {
            location: body.features[0].place_name,
            lat: body.features[0].center[1],
            long: body.features[0].center[0]
        })
    })
}

module.exports = geocode