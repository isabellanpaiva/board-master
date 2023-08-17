const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const Event = require("../models/Event.model")
const gamesAPI = require('../services/games.service')
const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.midleware')
const { trusted } = require('mongoose')

//comunity list 

router.get("/", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const currentUser = req.session.currentUser._id

    // utils
    const isFriend = (currentUser, friend_id) => currentUser.friends.includes(friend_id)

    User

        .find({ _id: { $ne: currentUser } })
        .then(async (users) => {

            try {

                const checkFriend = await User.findById(currentUser)

                users.forEach(user => {
                    user.isFriend = isFriend(checkFriend, user._id.toString())
                })

                res.render("community/community-list", { users, isLogged: req.session.currentUser, isFriend })

            } catch (err) {
                next(err)
            }
        })
        .catch(err => next(err))
})

//friends profiles

router.get("/details/:friend_id", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { friend_id } = req.params

    User

        .findById(friend_id)

        .then(async (user) => {

            //show friends of friends

            const showFriend = user.friends.map(async (friendId) => {
                const friend = await User.findById(friendId)
                return friend
            })

            const friendDetails = await Promise.all(showFriend)

            // //show friends favorited games

            const gamePromises = user.favorites.map((gameId) => {

                return gamesAPI.getGameDetails(gameId)

                    .then((game) => game.data.games)
            })

            const games = await Promise.all(gamePromises)

            const gameDetails = games.flat() //new array with sub-elements concatenated without []

            // show friends events 

            const eventsDetails = await Event

                .find({
                    $or: [{ organizer: friend_id }, { attendees: friend_id }]
                })
                .populate('organizer attendees')

            // render view 


            res.render("community/users-profile", { user, isLogged: req.session.currentUser, friendDetails, gameDetails, eventsDetails })
        })
        .catch(err => next(err))

})

// add friend (handler)

router.get("/add-friend/:friend_id", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { friend_id } = req.params

    const user_id = req.session.currentUser._id

    User

        .updateOne({ _id: user_id }, { $push: { friends: friend_id } }) // [ALTERNATIVE: $addToSet]
        .then(() => res.redirect("/"))
        .catch(err => next(err));
})

// remove friend (handler)

router.get("/remove-friend/:friend_id", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { friend_id } = req.params

    const user_id = req.session.currentUser._id

    User

        .findByIdAndUpdate({ _id: user_id }, { $pull: { friends: friend_id } })
        .then(() => res.redirect("/"))
        .catch(err => next(err))
})


module.exports = router