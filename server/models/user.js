const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    phone: Number,
});

module.exports = mongoose.model('user',UserSchema)