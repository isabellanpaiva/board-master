const express = require('express')
const router = express.Router()
const gamesAPI = require('../services/games.service')
const { Error } = require('mongoose')
const Event = require("../models/Event.model")
const User = require("../models/User.model")
const { formatDate } = require('./../utils/date-utils');
const { formatTime } = require('./../utils/date-utils');


router.get("/", (req, res, next) => {

    Event
        .find()
        .then(events => res.render('events/events-list', { events, isLogged: req.session.currentUser }))
        .catch(err => next(err))

})

router.get("/create/:game_id/:game_name", (req, res, next) => {
    const { game_id } = req.params

    gamesAPI
        .getGameDetails(game_id)
        .then(response => res.render('events/event-create', { game: response.data.games[0], isLogged: req.session.currentUser }))
        .catch(err => next(Error))


})

router.post("/create/:game_id/:game_name", (req, res, next) => {
    const { game_id, game_name } = req.params
    const { title, description, date, location } = req.body
    const organizer = req.session.currentUser._id


    Event
        .create({ title, gameId: game_id, gameName: game_name, description, date, location, organizer })
        .then(() => res.redirect('/events/'))
        .catch(err => next(err))




})

router.get('/details/:event_id', (req, res, next) => {
    const { event_id } = req.params
    const user_id = req.session.currentUser._id
    let eventJoined


    Event
        .findById(event_id)
        .then(event => {
            if (event.attendees.includes(user_id)) {
                eventJoined = true
            } else {
                eventJoined = false
            },
        
        .populate('organizer')
                .populate('attendees')
                .then(event => {
                    event.formattedDate = formatDate(event.date)
                    event.formattedTime = formatTime(event.date)

                })
            res.send(eventJoined)
            res.render('events/event-details', { event, isLogged: req.session.currentUser, eventJoined })
        })
        .catch(err => next(err))

})

router.get('/joinEvent/:event_id', (req, res, next) => {
    const { event_id } = req.params
    const user_id = req.session.currentUser._id


    Event
        .updateOne({ _id: event_id }, { $push: { attendees: user_id } })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))

})




module.exports = router