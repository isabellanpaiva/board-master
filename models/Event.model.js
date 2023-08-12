const { Schema, model } = require("mongoose")

const eventSchema = new Schema(

    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        // [TO BE CONFIRMED]

        gameInfo: [{
            type: Object,
            required: true
        }],

        // [TO BE CONFIRMED]

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

// [TO BE CONFIRMED]

// eventSchema.pre('save', async function (next) {
//     try {
//         if (!this.gameInfo) {
//             const gameResponse = await axios.get(`EXTERNAL_API_URL/${encodeURIComponent(this.gamePlayed)}`);
//             this.gameInfo = gameResponse.data;
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// [TO BE CONFIRMED]

const Event = model("Event", eventSchema)

module.exports = Event
