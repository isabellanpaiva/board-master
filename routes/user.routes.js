const express = require('express')
const router = express.Router()

router.get("/", (req, res, next) => {
    res.render("users/user-profile")
})

module.exports = router