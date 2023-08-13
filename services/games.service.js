const axios = require('axios')

class gamesAPIHandler {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: 'https://api.boardgameatlas.com/api'
        })
    }

    getAllGames() {
        return this.axiosApp.get('/search?&pretty=true&client_id=HZyPAYrRRj')
    }
}

const gamesAPI = new gamesAPIHandler()

module.exports = gamesAPI