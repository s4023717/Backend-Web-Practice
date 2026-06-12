const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add the user name"],
    },

    email: {
        type: String,
        required: [true, "Please add the email address"],
        unique: [true, "This email address is already taken"]
    },

    password: {
        type: String,
        required: [true, "Please add the password"],
    }
}, {
    Timestamps: true
})

module.exports = mongoose.model("User", userSchema);