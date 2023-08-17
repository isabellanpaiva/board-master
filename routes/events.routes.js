const express = require('express')
const router = express.Router()
const geocodingApi = require('../services/geocoding.service')
const gamesAPI = require('../services/games.service')
const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')
const { Error } = require('mongoose')
const Event = require("../models/Event.model")
const User = require("../models/User.model")
const { formatDate } = require('./../utils/date-utils')
const { formatTime } = require('./../utils/date-utils')


router.get("/", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    Event
        .find()
        .then((events) => {
            res.render('events/events-list', { events })
        })
        .catch(err => next(err))

})

router.get("/create/:game_id/:game_name", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { game_id } = req.params

    gamesAPI
        .getGameDetails(game_id)
        .then(response => res.render('events/event-create', { game: response.data.games[0] }))
        .catch(err => next(Error))

})

router.post("/create/:game_id/:game_name", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { game_id, game_name } = req.params
    const { title, description, date, address } = req.body
    const { _id: organizer } = req.session.currentUser


    geocodingApi
        .getCoordenates(address)
        .then(response => {
            const location = {
                type: 'Point',
                coordenates: [response.data.results[0].geometry.location.lng, response.data.results[0].geometry.location.lat]
            }
            return location
        })
        .then(location => Event
            .create({ title, gameId: game_id, gameName: game_name, description, date, address, location, organizer })
            .then(() => res.redirect('/events/')))
        .catch(err => next(err))
})

router.get('/details/:event_id', isLoggedIn, checkRoles('USER', 'ADMIN'), async (req, res, next) => {

    try {
        const { event_id } = req.params
        const user_id = req.session.currentUser._id
        const event = await

            Event
                .findById(event_id)
                .populate('organizer attendees')

        const eventJoined = event.attendees.some(attendee => attendee._id.equals(user_id))
        const isEventOwner = event.organizer._id.equals(user_id) || req.session.currentUser.role === 'ADMIN'

        event.formattedDate = formatDate(event.date)
        event.formattedTime = formatTime(event.date)

        res.render('events/event-details', { event, eventJoined, isEventOwner })

    } catch (err) {
        next(err)
    }

})


router.get('/joinEvent/:event_id', isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { event_id } = req.params
    const { _id: user_id } = req.session.currentUser

    Event
        .updateOne({ _id: event_id }, { $push: { attendees: user_id } })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))

})

router.get("/withdrawEvent/:event_id", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { event_id } = req.params
    const { _id: user_id } = req.session.currentUser

    Event
        .updateOne({ _id: event_id }, { $pull: { attendees: user_id } })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))

})

router.get('/edit/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params
    const { _id: user_id } = req.session.currentUser

    Event

        .findById(event_id)
        .then((event) => {

            const isEventOwner = event.organizer._id.equals(user_id) || req.session.currentUser.role === 'ADMIN'

            if (isEventOwner) {
                res.render('events/event-edit', { event })
            } else {
                res.redirect('/login?err=Access forbiden. You do not have the role to access this page')
            }
        })
        .catch(err => next(err))
})

router.post('/edit/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params
    const { title, description, date, location } = req.body

    Event
        .findByIdAndUpdate(event_id, { title, description, date, location })
        .then((event) => {

            const isEventOwner = event.organizer._id.equals(user_id) || req.session.currentUser.role === 'ADMIN'

            if (isEventOwner) {
                res.redirect(`/events/details/${event_id}`)
            } else {
                res.redirect('/login?err=Access forbiden. You do not have the role to access this page')
            }
        })
        .catch(err => next(err))
})

router.get('/delete/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params;
    const { _id: user_id } = req.session.currentUser

    Event
        .findById(event_id)
        .then((event) => {

            if (!event) {
                res.redirect('/events');
                return;
            }

            const isEventOwner = event.organizer._id.equals(user_id) || req.session.currentUser.role === 'ADMIN';

            if (isEventOwner) {
                Event
                    .findByIdAndDelete(event_id)
                    .then(() => res.redirect('/events'))
                    .catch(err => next(err));
            } else {
                res.redirect('/login?err=Access forbidden. You do not have the role to access this page');
            }
        })
        .catch(err => next(err));
});


module.exports = router