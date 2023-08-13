//initial setup

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const uploaderMiddleware = require('../middlewares/uploader.midleware')
const { isLoggedOut } = require('../middlewares/route-guard')

const saltRounds = 10



//signup screen (render)

router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})

//signup screen (handler)

router.post('/signup', isLoggedOut, uploaderMiddleware.single('profilePicture'), (req, res, next) => {

    const { username, email, password, description } = req.body
    const { path: profilePicture } = req.file


    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ username, email, description, password: hash, profilePicture }))
        .then(() => res.redirect('/login'))
        .catch(err => next(err))
})

// login form (render)

router.get('/login', isLoggedOut, (req, res) => {
    res.render('auth/login')
})

// login form (handler)

router.post('/login', isLoggedOut, (req, res, next) => {

    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login', { errorMessage: 'Please fill all the fields before subscribe' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render('auth/login', { errorMessage: 'User not registered' })
                return
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render('auth/login', { errorMessage: 'Wrong password. Please try again' })
                return
            }

            req.session.currentUser = foundUser // login!
            res.redirect('/')
        })
        .catch(err => next(err))
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})

//export setup

module.exports = router