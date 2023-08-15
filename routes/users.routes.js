const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const gamesAPI = require('../services/games.service')
const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.midleware')

// my profile 

router.get("/profile/:user_id", isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User

        .findById(user_id)

        .then(async (user) => {

            //show friends

            const showFriend = user.friends.map(async (friendId) => {

                const friend = await

                    User

                        .findById(friendId)

                return friend

            })

            const friendDetails = await Promise.all(showFriend)

            // //show favorited games

            const gamePromises = user.favorites.map((gameId) => {

                return gamesAPI.getGameDetails(gameId)

                    .then((game) => game.data.games)
            })

            const games = await Promise.all(gamePromises)

            const gameDetails = games.flat() //new array with sub-elements concatenated without []

            // render view 

            res.render("users/user-profile", { isLogged: req.session.currentUser, user, friendDetails, gameDetails })


        })

        .catch(err => next(err))

})

// edit profile (render)

router.get("/edit/:user_id", isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then((user) => {
            res.render("users/user-edit", { isLogged: req.session.currentUser, user })
        })
        .catch(err => next(err))
})

// edit profile (handler)

router.post('/edit/:user_id', isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    const { username, email, description } = req.body
    //const { path: profilePicture } = req.file

    User
        // .findByIdAndUpdate(user_id, { username, email, description }, { path })
        .findByIdAndUpdate(user_id, { username, email, description })
        .then(() => res.redirect(`/users/profile/${user_id}`))
        .catch(err => next(err))
})

// delete profile

router.post('/delete/:user_id', isLoggedIn, (req, res, next) => {

    const { user_id } = req.params;

    User.findByIdAndDelete(user_id)

        .then(() => {
            req.session.currentUser = null;
            res.redirect('/');
        })
        .catch(err => next(err));
});


module.exports = router