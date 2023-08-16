const axios = require('axios')

class gamesAPIHandler {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: 'https://api.boardgameatlas.com/api'
        })
    }

    getAllCategories() {
        return this.axiosApp.get('/game/categories?pretty=true&client_id=oRHFQODxrP')
    }

    getAllGames(category_id) {
        return this.axiosApp.get(`/search?categories=${category_id}&limit=100&fields=image_url,name,id&pretty=true&client_id=JLBr5npPhV`)
    }

    getGameDetails(game_id) {
        return this.axiosApp.get(`/search?ids=${game_id}&client_id=oRHFQODxrP`)
    }

    getGamebyName(game_name) {
        return this.axiosApp.get(`/search?name=${game_name}&limit=100&client_id=oRHFQODxrP`)
    }
}

const gamesAPI = new gamesAPIHandler()

module.exports = gamesAPI