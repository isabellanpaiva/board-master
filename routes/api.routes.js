const express = require('express')
const router = express.Router()
const Event = require('./../models/Event.model')

router.get("/events", (req, res, next) => {
    Event
        .find()
        .then(events => res.json(events))
        .catch(err => next(err))

})

module.exports = router