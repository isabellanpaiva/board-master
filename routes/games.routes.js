const express = require('express')
const router = express.Router()

const gamesAPI = require('../services/games.service')

router.get("/categories", (req, res, next) => {

    gamesAPI
        .getAllCategories()
        .then(response => res.render("games/games-categories", { categories: response.data.categories }))
        .catch(err => next(err))
})

router.get("/list/:category_id/:category_name", (req, res, next) => {

    const { category_id, category_name } = req.params

    gamesAPI
        .getAllGames(category_id)
        .then(response => res.render('games/game-list', { category_name, games: response.data.games }))
        .catch(err => next(err))

})

router.get("/details/:game_name", (req, res, next) => {
    const { game_name } = req.params

    gamesAPI
        .getGameDetails(game_name)
        .then(response => res.render('games/game-details', { game: response.data.games[0] }))
        .catch(err => next(err))

})

module.exports = router