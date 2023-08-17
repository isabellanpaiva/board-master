const updateSessionViews = (req, res, next) => {
    console.log('ÁCTUALIZANDO SESIONM')
    req.app.locals.isLogged = req.session.currentUser
    next()
}

module.exports = { updateSessionViews }