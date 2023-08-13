const express = require('express')
const router = express.Router()

router.get("/", (req, res, next) => {
    res.render("community/community-list", { isLogged: req.session.currentUser })
})

module.exports = router