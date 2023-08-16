const express = require('express')
const router = express.Router()
const gamesAPI = require('../services/games.service')
const User = require("../models/User.model")
const { isLoggedIn } = require('../middlewares/route-guard')

router.get("/categories", (req, res, next) => {

    gamesAPI
        .getAllCategories()
        .then(response => res.render("games/games-categories", { categories: response.data.categories, isLogged: req.session.currentUser }))
        .catch(err => next(err))
})

router.get("/list/:category_id/:category_name", (req, res, next) => {

    const { category_id, category_name } = req.params
    const user = req.session.currentUser


    gamesAPI
        .getAllGames(category_id)
        .then(response => res.render('games/game-list', { isLogged: req.session.currentUser, user, category_name, category_id, games: response.data.games }))
        .catch(err => next(err))

})

router.get("/details/:game_id", (req, res, next) => {

    const { game_id } = req.params

    if (!req.session.currentUser) {

        gamesAPI
            .getGameDetails(game_id)
            .then(response => res.render('games/game-details', { game: response.data.games[0], isLogged: req.session.currentUser }))
            .catch(err => next(err))

    } else {

        const user_id = req.session.currentUser._id

        User
            .findById(user_id)
            .then(user => {
                const gameAdded = user.favorites.includes(game_id)
                return gameAdded
            })
            .then(gameAdded => {
                gamesAPI
                    .getGameDetails(game_id)
                    .then(response => res.render('games/game-details', { game: response.data.games[0], isLogged: req.session.currentUser, gameAdded }))
                    .catch(err => next(err))
            })
    }
})


router.get("/add-game/:game_id", (req, res, next) => {
    const { game_id } = req.params
    const user_id = req.session.currentUser._id



    User
        .updateOne({ _id: user_id }, { $push: { favorites: game_id } })
        .then(() => res.redirect(`/games/details/${game_id}`))
        .catch(err => next(err))

})

router.get("/delete-game/:game_id", (req, res, next) => {

    const { game_id, } = req.params
    const user_id = req.session.currentUser._id

    User
        .findByIdAndUpdate({ _id: user_id }, { $pull: { favorites: game_id } })
        .then(() => res.redirect('/games/categories'))
        // .then(() => res.redirect(`/games/details/${game_id}`))
        .catch(err => next(err))




})

router.post('/search', (req, res, next) => {
    const { gameName } = req.body

    gamesAPI
        .getGamebyName(gameName)
        .then(response => res.render('games/game-list', { isLogged: req.session.currentUser, games: response.data.games }))
        .catch(err => next(err))

})

module.exports = router