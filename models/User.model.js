const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {

    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    description: {
      type: String,
    },

    profilePicture: {
      type: String,
    },

    myFriends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],

    // [TO BE CONFIRMED]

    myGames: [{
      type: Object,
    }]

    // [TO BE CONFIRMED]

  },

  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
