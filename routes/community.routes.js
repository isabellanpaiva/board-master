const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')
const uploaderMiddleware = require('../middlewares/uploader.midleware')
const { trusted } = require('mongoose')

// ----------- [REVIEW: using friends model property instead of new isFriend] ----------

// router.get("/", isLoggedIn, (req, res, next) => {

//     const currentUser = req.session.currentUser._id

//     User

//         .find({ _id: { $ne: currentUser } })

//         .then(user => {

//             let isFriend = (currentUser, friend_id) => {
//                 if (user.friends.includes(friend_id)) {
//                     return isFriend = true
//                 } else {
//                     return isFriend = false
//                 }
//             }
//         })

//         .then(res.render("community/community-list", { user, isLogged: req.session.currentUser, isFriend }))
//         .catch(err => next(err))
// })

//comunity list 

router.get("/", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const currentUser = req.session.currentUser._id

    const isFriend = (currentUser, friend_id) => {
        if (currentUser.friends.includes(friend_id)) {
            return true
        } else {
            return false
        }
    }

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

// ----------- [REVIEW] ----------


//comunity profiles

router.get("/details/:friend_id", isLoggedIn, checkRoles('USER', 'ADMIN'), async (req, res, next) => {

    try {
        const { friend_id } = req.params

        const currentUser = req.session.currentUser

        const user = await User.findById(friend_id);

        res.render("community/users-profile", { user, isLogged: currentUser })
    } catch (err) {
        next(err);
    }
});


router.get("/details/:friend_id", isLoggedIn, checkRoles('USER', 'ADMIN'), (req, res, next) => {

    const { friend_id } = req.params

    User

        .findById(friend_id)
        .then((user) => {
            res.render("community/users-profile", { user, isLogged: req.session.currentUser })
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