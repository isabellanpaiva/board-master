const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.midleware')

//comunity list 

router.get("/", (req, res, next) => {

    // // const ownerRole = {
    // //     isOwner: req.session.currentUser._id === id
    // // }

    User
        .find()
        .then(users => res.render("community/community-list", { users, isLogged: req.session.currentUser }))
        .catch(err => next(err))
})

//comunity profiles

router.get("/details/:friend_id", isLoggedIn, (req, res, next) => {

    const { friend_id } = req.params

    const ownerRole = {
        isOwner: req.session.currentUser._id === id
    }

    User

        .findById(friend_id)
        .then((user) => {
            res.render("community/users-profile", { user, isLogged: req.session.currentUser })
        })
        .catch(err => next(err))

})

// add friend (handler)

router.get("/add-friend/:friend_id", isLoggedIn, (req, res, next) => {

    const { friend_id } = req.params

    const user_id = req.session.currentUser._id

    User

        .updateOne({ _id: user_id }, { $push: { friends: friend_id } }) // [ALTERNATIVE: $addToSet]
        .then(() => res.redirect("/"))
        .catch(err => next(err));
})

// remove friend (handler)

router.get("/remove-friend/:friend_id", isLoggedIn, (req, res, next) => {

    const { friend_id } = req.params

    const user_id = req.session.currentUser._id

    User

        .findByIdAndUpdate({ _id: user_id }, { $pull: { friends: friend_id } })
        .then(() => res.redirect("/"))
        .catch(err => next(err))
})


module.exports = router