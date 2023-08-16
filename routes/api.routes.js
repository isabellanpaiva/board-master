const express = require('express')
const router = express.Router()
const Event = require('./../models/Event.model')

router.get("/places/:event_id", (req, res, next) => {
    Event
        .findById()
})

module.exports = router