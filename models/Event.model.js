const { Schema, model } = require("mongoose")

const eventSchema = new Schema(

    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        gameId: {
            type: String,
            required: true
        },

        gameName: {
            type: String
        },

        description: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        attendees: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },

    {
        timestamps: true
    }

)

const Event = model("Event", eventSchema)

module.exports = Event
