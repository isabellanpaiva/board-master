const axios = require('axios')

class geocoding {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/geocode'
        })
    }

    getCoordenates(address) {

        return this.axiosApp.get(`/json?address=${address}&key=AIzaSyBPQd2uaw4aqmx9lrJE7pESbjI9eBxf4sY`)
    }
}

const geocodingApi = new geocoding()

module.exports = geocodingApi