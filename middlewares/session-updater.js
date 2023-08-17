const updateSessionViews = (req, res, next) => {

    req.app.locals.isLogged = req.session.currentUser
    next()
}

module.exports = { updateSessionViews }