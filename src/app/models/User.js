const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    updatedAt: {
        type: Date,
        default: null,
        select: false
    }
})

module.exports = mongoose.model('User', UserSchema);