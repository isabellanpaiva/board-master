const express = require('express')
const router = express.Router()
//const { isLoggedIn, isLoggedOut } = require('../middlewares/route-guard')

router.get("/", (req, res, next) => {
  res.render("index", { isLogged: req.session.currentUser })
})

module.exports = router
