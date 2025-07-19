const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    name: String,
    picture: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema)