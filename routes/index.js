module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    const userRoutes = require("./user.routes")
    app.use("/user", userRoutes)

    const gamesRoutes = require("./games.routes")
    app.use("/games", gamesRoutes)

    const eventsRoutes = require("./events.routes")
    app.use("/events", eventsRoutes)

    const communityRoutes = require("./community.routes")
    app.use("/community", communityRoutes)

    // const apiRoutes = require("./api.routes")
    // app.use("/api", apiRoutes)

}