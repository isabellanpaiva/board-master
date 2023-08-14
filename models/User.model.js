const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {

    username: {
      type: String,
      trim: true,
      required: [true, 'Please fill the username field'],
      unique: true
    },

    email: {
      type: String,
      required: [true, 'Please fill the e-mail field'],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, 'Please fill the password field'],
    },

    description: {
      type: String,
    },

    profilePicture: {
      type: String,
      // default: 
    },

    friends: [{
      type: String,
    }],
    
    favorites: [{
      type: String,
    }],

    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    }

  },

  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
