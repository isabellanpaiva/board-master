const express = require('express')
const router = express.Router()
const gamesAPI = require('../services/games.service')
const { isLoggedIn } = require('../middlewares/route-guard')
const { Error } = require('mongoose')
const Event = require("../models/Event.model")
const User = require("../models/User.model")
const { formatDate } = require('./../utils/date-utils');
const { formatTime } = require('./../utils/date-utils');



router.get("/", (req, res, next) => {

    Event

        .find()

        // .then(events => res.render('events/events-list', { events, isLogged: req.session.currentUser }))
        .then((events) => {

            // const ownerRole = events.map(event => ({
            //     isOwner: req.session.currentUser._id.toString() === event.organizer.toString()
            // }))

            // console.log(ownerRole)

            res.render('events/events-list', { events, isLogged: req.session.currentUser })
            // res.render('events/events-list', { events, isLogged: req.session.currentUser, ownerRole })

        })

        .catch(err => next(err))


})

router.get("/create/:game_id/:game_name", isLoggedIn, (req, res, next) => {
    const { game_id } = req.params

    gamesAPI
        .getGameDetails(game_id)
        .then(response => res.render('events/event-create', { game: response.data.games[0], isLogged: req.session.currentUser }))
        .catch(err => next(Error))


})

router.post("/create/:game_id/:game_name", isLoggedIn, (req, res, next) => {
    const { game_id, game_name } = req.params
    const { title, description, date, location } = req.body
    const organizer = req.session.currentUser._id


    Event
        .create({ title, gameId: game_id, gameName: game_name, description, date, location, organizer })
        .then(() => res.redirect('/events/'))
        .catch(err => next(err))

})

router.get('/details/:event_id', isLoggedIn, (req, res, next) => {
    const { event_id } = req.params
    const user_id = req.session.currentUser._id
    let eventJoined


    Event
        .findById(event_id)
        .then(event => {
            if (event.attendees.includes(user_id)) {
                return eventJoined = true
            } else {
                return eventJoined = false
            }
        })
        .then(Event
            .findById(event_id)
            // .then(event => res.json(event))
            .populate('organizer')
            .populate('attendees')
            .then(event => {
                event.formattedDate = formatDate(event.date)
                event.formattedTime = formatTime(event.date)

                res.render('events/event-details', { event, isLogged: req.session.currentUser, eventJoined })
            }))
        .catch(err => next(err))

})

router.get('/joinEvent/:event_id', isLoggedIn, (req, res, next) => {
    const { event_id } = req.params
    const user_id = req.session.currentUser._id


    Event
        .updateOne({ _id: event_id }, { $push: { attendees: user_id } })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))

})

router.get("/withdrawEvent/:event_id", isLoggedIn, (req, res, next) => {

    const { event_id } = req.params
    const user_id = req.session.currentUser._id

    Event
        .updateOne({ _id: event_id }, { $pull: { attendees: user_id } })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))

})

router.get('/edit/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params

    Event

        .findById(event_id)
        .then(event => res.render('events/event-edit', event))
        .catch(err => next(err))

})

router.post('/edit/:event_id', isLoggedIn, (req, res, next) => {
    const { event_id } = req.params
    const { title, description, date, location } = req.body

    Event
        .findByIdAndUpdate(event_id, { title, description, date, location })
        .then(() => res.redirect(`/events/details/${event_id}`))
        .catch(err => next(err))

})

router.get('/delete/:event_id', isLoggedIn, (req, res, next) => {
    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/events'))
        .catch(err => next(err))

})




module.exports = router