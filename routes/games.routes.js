const express = require('express')
const router = express.Router()
const gamesAPI = require('../services/games.service')
const User = require("../models/User.model")
const Event = require("./../models/Event.model")
const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')

router.get("/categories", (req, res, next) => {

    gamesAPI
        .getAllCategories()
        .then(response => res.render("games/games-categories", { categories: response.data.categories }))
        .catch(err => next(err))
})

router.get("/list/:category_id/:category_name", (req, res, next) => {

    const { category_id, category_name } = req.params
    const user = req.session.currentUser

    gamesAPI
        .getAllGames(category_id)
        .then(response => res.render('games/game-list', { user, category_name, category_id, games: response.data.games }))
        .catch(err => next(err))

})

router.get("/details/:game_id", (req, res, next) => {

    const { game_id } = req.params

    if (!req.session.currentUser) {

        gamesAPI
            .getGameDetails(game_id)
            .then(response => res.render('games/game-details', { game: response.data.games[0] }))
            .catch(err => next(err))

    } else {

        const { _id: user_id } = req.session.currentUser

        const promises = [User.findById(user_id), gamesAPI.getGameDetails(game_id), User.find({ favorites: game_id }), Event.find({ gameId: game_id })]

        Promise.all(promises)
            .then(([user, gameFromApi, userList, events]) => {
                const viewInfo = {
                    gameAdded: user.favorites.includes(game_id),
                    game: gameFromApi.data.games[0],
                    users: userList,
                    events: events
                }



                res.render('games/game-details', viewInfo)
            })





        //     User
        //         .findById(user_id)
        //         .then(user => {
        //             const gameAdded = user.favorites.includes(game_id)
        //             return gameAdded
        //         })
        //         .then(gameAdded => {
        //             gamesAPI
        //                 .getGameDetails(game_id)
        //                 .then(response => res.render('games/game-details', { game: response.data.games[0], gameAdded }))
        //                 .catch(err => next(err))
        //         })
        // }
    }
})


router.get("/add-game/:game_id", checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { game_id } = req.params
    const { _id: user_id } = req.session.currentUser

    User
        .updateOne({ _id: user_id }, { $push: { favorites: game_id } })
        .then(() => res.redirect(`/games/details/${game_id}`))
        .catch(err => next(err))

})

router.get("/delete-game/:game_id", checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { game_id } = req.params
    const { _id: user_id } = req.session.currentUser

    User
        .findByIdAndUpdate({ _id: user_id }, { $pull: { favorites: game_id } })
        .then(() => res.redirect('/games/categories'))
        .catch(err => next(err))

})

router.post('/search', checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { gameName } = req.body

    gamesAPI
        .getGamebyName(gameName)
        .then(response => res.render('games/game-list', { games: response.data.games }))
        .catch(err => next(err))

})

module.exports = router