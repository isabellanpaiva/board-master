const axios = require('axios')

class geocoding {

    // constructor() {

    //     // this.axiosApp = axios.create({
    //     //     baseURL: 'https://maps.googleapis.com/maps/api/geocode'
    //     // })
    // }

    getCoordenates(address) {

        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Calle%20de%20Santa%20Genoveva,%2052,%20Madrid,%20Espa%C3%B1a&key=AIzaSyBPQd2uaw4aqmx9lrJE7pESbjI9eBxf4sY`)
    }
}

const geocodingApi = new geocoding()

module.exports = geocodingApi