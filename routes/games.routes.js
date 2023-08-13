const express = require('express')
const router = express.Router()

const gamesAPI = require('../services/games.service')

router.get("/", (req, res, next) => {

    gamesAPI
        .getAllGames()
        //.then(response => res.send(response.data))
        .then(response => res.render("games/games-list", { games: response.data.games }))
        .catch(err => next(err))
})

module.exports = router