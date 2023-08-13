const axios = require('axios')

class gamesApiHandler {
    constructor() {
        this.axiosApp.create({
            baseURL: 'https://api.boardgameatlas.com/api'
        })
    }

    getAllGames() {
        return this.axiosApp.get('/lists?client_id=oRHFQODxrP')
    }
}